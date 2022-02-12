using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuiQue.Models;
using Microsoft.EntityFrameworkCore;
using QuiQue;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace QuiQue.Controllers
{
    public class SystemController : Controller
    {
        private readonly ILogger<SystemController> _logger;

        private QuickQueueContext _context;

        private readonly IJWTAuthenticationManager _JWTAuthenticationManager;

        public SystemController(QuickQueueContext context, ILogger<SystemController> logger, IJWTAuthenticationManager jWTAuthenticationManager)
        {
            _context = context;
            _logger = logger;
            _JWTAuthenticationManager = jWTAuthenticationManager;
        }

        [Authorize]
        [Route("/queue/create/system/create")]
        [HttpPost]
        public IActionResult PostCreateEvent([FromBody] Event Event)
        {
            Event.OwnerId = System.Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            // Без Title
            if (Event.Title == null) return BadRequest();
            // перевірити чи всі поля правильні
            _context.Add(Event);
            _context.SaveChanges();
            return new OkObjectResult(Event);
        }

        [Authorize]
        [Route("/queue/{idEvent}/moder/system/delete")]
        [HttpDelete]
        public IActionResult QueueIdModerSystemDelete([FromRoute] Int64 idEvent, [FromQuery] Int64 idUser)
        {
            Int64 OwnerId = System.Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Queue queue = _context.Queues.FirstOrDefault(c => c.idUser == idUser && c.EventId == idEvent);
            Event evnt = _context.Events.FirstOrDefault(c => c.EventId == idEvent);
            // Чи в токені лежить id модератора
            if (evnt == null || evnt.OwnerId != OwnerId) return Forbid();
            if (evnt.OwnerId != OwnerId) return UnprocessableEntity();
            // Перевіряю чи є така черга взагалі для того, щоб видалити
            try
            {
                _context.Remove(queue);
                return new OkObjectResult(queue);
            }
            catch
            {
                return NotFound();
            }
            _context.SaveChanges();
            return new OkObjectResult(queue);
        }

        [Authorize]
        [Route("/queue/{idEvent}/moder/system/update/")]
        [HttpPut]
        public IActionResult QueueIdModerSystemUpdate([FromRoute] Int64 idEvent, [FromBody] Event ev)
        {
            Int64 OwnerId = System.Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Event evnt = _context.Events.FirstOrDefault(c => c.EventId == idEvent);
            // перевіряю наявність потрібних даних
            try
            {
                evnt.Title = ev.Title;
            }
            catch
            {
                return NotFound();
            }
            if (evnt.OwnerId != OwnerId)
            {
                return Forbid();
            }
            try
            {
                _context.Update(evnt);
            }
            catch
            {
                return NotFound();
            }
            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return UnprocessableEntity();
            }
            return new OkObjectResult(evnt);
        }
        // юра
        public class Comand
        {
            public string comand;
        }
        private Queue nextuser(Int64 eventid)
        {
            Queue change = _context.Queues.Where(o => o.Status != "pass" && o.EventId == eventid).OrderBy(o => o.Number).FirstOrDefault();
            // чи є користувачі в черзі для пропуску
            if (change == null)
                return null;//"nobody is waiting on queue";
            change.Status = "pass";
            _context.SaveChanges();
            return change;//"Ok";
        }
        private bool close(Event Event)
        {
            // чи вже закрита 
            if (!Event.IsSuspended)
                return false;

            Event.IsSuspended = true;
            _context.SaveChanges();
            return true;
        }
        private bool finish(Event Event)
        {
            // поідеї тут каскадне видалення 
            _context.Remove(Event);
            _context.SaveChanges();
            return true;
        }

        private bool open(Event Event)
        {
            // чи вже відкрита 
            if (Event.IsSuspended)
                return false;

            Event.IsSuspended = false;
            _context.SaveChanges();
            return true;
        }

        [Authorize]
        [Route("/queue/{idEvent}/moder/system/{value}/")]
        [HttpPut]
        public IActionResult QueueIdModerSystemNext([FromRoute] Int64 idEvent, [FromRoute] string value)
        {
            Int64 OwnerId = System.Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Event evnt = _context.Events.FirstOrDefault(c => c.EventId == idEvent);
            if (evnt == null)
            {
                return NotFound();
            }
            switch (value)
            {
                case "next":
                    var resalt = nextuser(idEvent);
                    if (resalt == null)
                        return BadRequest();
                    else
                        return new OkObjectResult(resalt);
                case "close":
                    if (close(evnt))
                        return new OkResult();
                    else
                        return BadRequest();
                case "finish":
                    if (close(evnt))
                        return new OkResult();
                    else
                        return BadRequest(":(((");
                case "open":
                    if (finish(evnt))
                        return new OkResult();
                    else
                        return BadRequest(":(((");
                default:
                    return BadRequest("Default Error");
            }
        }

        //////////////////////////////////////
        [Authorize]
        [Route("/get_my_id")]
        [HttpGet]
        public IActionResult IS()
        {
            Int64 Userid = System.Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User ISuser = _context.Users.FirstOrDefault(c => c.idUser == Userid);
            
            if (ISuser == null)
                return NotFound();
            return Ok(Userid);
        }


        [Authorize]
        [Route("/IOwner/{idEvent}")]
        [HttpGet]
        public async Task<IActionResult> IOwner([FromRoute] Int64 idEvent)
        {
            Int64 Userid = System.Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Event Event = await _context.Events.FirstOrDefaultAsync(e => e.EventId == idEvent);
            if (Event == null)
                return NotFound();

            if (Event.OwnerId == Userid)
                return Ok(true);
            else
                return Ok(false);
        }

        [Authorize]
        [Route("/event/{idEvent}")]
        [HttpGet]
        public IActionResult GetEvent([FromRoute] Int64 idEvent)
        {
            Event Event = _context.Events.FirstOrDefault(e => e.EventId == idEvent);
            if (Event == null)
            {
                return NotFound();
            }
            return new OkObjectResult(Event);
        }

        [Authorize]
        [Route("/my_account")]
        [HttpGet]
        public IActionResult GetUser()
        {
            Int64 idUser = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = _context.Users.FirstOrDefault(e => e.idUser == idUser);
            user.Password = "";
            return new OkObjectResult(user);
        }
    }
}
