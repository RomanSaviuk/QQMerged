using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using QuiQue.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using QuiQue.Models.View;
using Microsoft.EntityFrameworkCore;

namespace QuiQue.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/queues/{queueId}/system")]
    public class SystemUserController : ControllerBase
    {
        private readonly ILogger<SystemUserController> _logger;

        private QuickQueueContext _context;

        private readonly IJWTAuthenticationManager _JWTAuthenticationManager;

        public SystemUserController(QuickQueueContext context, ILogger<SystemUserController> logger, IJWTAuthenticationManager jWTAuthenticationManager)
        {
            _context = context;
            _logger = logger;
            _JWTAuthenticationManager = jWTAuthenticationManager;
        }
        [Route("/get_queue/{queueId}")]
        [HttpGet]
        public async Task<IActionResult> QueueGetUpdate([FromRoute] int queueId)
        {
            List<Queue> queue = _context.Queues.Where(qid => qid.EventId == queueId).ToList();

            // convert to view 
            List<QueueModel> queueModels = queue.Select(q => new QueueModel
            {
                User = _context.Users.FirstOrDefault(u => u.idUser == q.idUser).Username,
                idUser = q.idUser,
                EventId = q.EventId,
                Time_queue = q.Time_queue,
                Status = q.Status,
                Number = q.Number
            }).ToList();

            return new OkObjectResult(queueModels);
        }

        [Route("/queue/system/enter/{EventId}")]
        [HttpPost]
        public IActionResult EnterQueue([FromRoute] Int64 EventId)
        {
            Queue new_position = new Queue();
            Int64 idUser = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            new_position.idUser = idUser;
            if (_context.Events.FirstOrDefault(e => e.EventId == EventId) is null) //чи існує івент
            {
                return NotFound();
            }
            if (_context.Events.FirstOrDefault(e => e.EventId == EventId).OwnerId == idUser) // хоче записатися у свою чергу
            {
                return Forbid();
            }
            if (_context.Queues.FirstOrDefault(u => u.idUser == idUser && u.EventId == EventId && u.Status != "pass") is not null) //повторний запис?
            {
                return UnprocessableEntity();
            }
            if (_context.Events.FirstOrDefault(e => e.EventId == EventId).IsSuspended == true)
            {
                return NotFound("Event is suspended!");
            }

            new_position.EventId = EventId;
            List <Queue> queues = _context.Queues.Where(e => e.EventId == EventId).ToList();
            new_position.Number = queues.LastOrDefault() == null ? 1 : queues.Last().Number + 1;
            new_position.Time_queue = DateTime.UtcNow;
            new_position.Status = "in queue";
            new_position.User = _context.Users.FirstOrDefault(u => u.idUser == idUser);
            _context.Add(new_position);
            _context.SaveChanges();
            return new OkObjectResult(new_position);
        }

        [Route("/queue/system/delete/{EventId}")]
        [HttpDelete]
        public IActionResult LeaveQueue([FromRoute] Int64 EventId)
        {
            Int64 idUser = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Queue deleted_queue = _context.Queues.FirstOrDefault(q => q.EventId == EventId && q.idUser == idUser);
            if (deleted_queue is null)
            {
                return NotFound();
            }
            _context.Remove(deleted_queue);
            _context.SaveChanges();
            return new OkResult();
        }
        [Route("/get_my_event")]
        [HttpGet]
        public async Task<IActionResult> MyEvent()
        {
            Int64 idUser = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            List<Event> Event = await _context.Events.Where(e => e.OwnerId == idUser).ToListAsync();
            if (Event.Count() == 0)
            {
                return NotFound("No info");
            }
            return new OkObjectResult(Event);
        }

        [Route("/get_my_queue")]
        [HttpGet]
        public async Task<IActionResult> MyQeueu()
        {
            Int64 idUser = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            var events = await _context.Events.Join(_context.Queues,
                e => e.EventId,
                q => q.EventId,
                (e, q) => new
                {
                    EventId = e.EventId,
                    OwnerId = e.OwnerId,
                    Title = e.Title,
                    isFastQueue = e.isFastQueue,
                    WaitingTimer = e.WaitingTimer,
                    User = q.idUser
                }).Where(e => e.User == idUser).ToListAsync();  
            return new OkObjectResult(events);
        }

    }
}
