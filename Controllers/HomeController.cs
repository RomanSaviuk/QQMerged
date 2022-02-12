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
using System.Threading;

namespace QuiQue.Controllers

{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        private QuickQueueContext _context;

        private readonly IJWTAuthenticationManager _JWTAuthenticationManager;

        public HomeController(QuickQueueContext context, ILogger<HomeController> logger, IJWTAuthenticationManager jWTAuthenticationManager)
        {
            _context = context;
            _logger = logger;
            _JWTAuthenticationManager = jWTAuthenticationManager;
        }
        [AllowAnonymous]
        [Route("[controller]/add_date")]
        [HttpGet]
        public IActionResult Get()
        {
            Date();
            return Ok("I add your date");
        }

        [Route("/my_account")]
        [HttpGet]
        public IActionResult GetUser()
        {
            Int64 idUser = Convert.ToInt64(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = _context.Users.FirstOrDefault(e => e.idUser == idUser);
            user.Password = "";
            return new OkObjectResult(user);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
            return new OkObjectResult(user);
        }

        [Route("/event")]
        [HttpPost]
        public IActionResult CreateEvent(Event event1)
        {
            _context.Add(event1);
            _context.SaveChanges();
            return new OkObjectResult(event1);
        }

        // отримати інформацію про івент за ID
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


        private void Date()
        {
            int usernumber = 1;
            User user1 = new User { Username = "string", Email = $"string{usernumber}", Password = "string", PhoneNumber = "0000111" };
            usernumber++;
            User user2 = new User { Username = "string", Email = $"string{usernumber}", Password = "string", PhoneNumber = "0000111" };
            usernumber++;
            User user3 = new User { Username = "string", Email = $"string{usernumber}", Password = "string", PhoneNumber = "0000111" };
            usernumber++;
            User user4 = new User { Username = "string", Email = $"string{usernumber}", Password = "string", PhoneNumber = "0000111" };
            usernumber++;
            User user5 = new User { Username = "string", Email = $"string{usernumber}", Password = "string", PhoneNumber = "0000111" };
            usernumber++;
            User user6 = new User { Username = "string", Email = $"string{usernumber}", Password = "string", PhoneNumber = "0000111" };
            int salt = 12;
            user1.Password = BCrypt.Net.BCrypt.HashPassword(user1.Password, salt);
            user2.Password = BCrypt.Net.BCrypt.HashPassword(user2.Password, salt);
            user3.Password = BCrypt.Net.BCrypt.HashPassword(user3.Password, salt);
            user4.Password = BCrypt.Net.BCrypt.HashPassword(user4.Password, salt);
            user5.Password = BCrypt.Net.BCrypt.HashPassword(user5.Password, salt);
            user6.Password = BCrypt.Net.BCrypt.HashPassword(user6.Password, salt);
            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);
            _context.Add(user4);
            _context.Add(user5);
            _context.Add(user6);
            _context.SaveChanges();
            //Thread.Sleep(2000);

            Event Event1 = new Event { OwnerId = user1.idUser, Title = "string", isFastQueue = true, IsSuspended = false, Description = "string", WaitingTimer = "string" };
            Event Event2 = new Event { OwnerId = user1.idUser, Title = "string", isFastQueue = true, IsSuspended = false, Description = "string", WaitingTimer = "string" };
            _context.Add(Event1);
            _context.Add(Event2);
            _context.SaveChanges();

            usernumber = 1;
            Queue queue1 = new Queue { EventId = Event1.EventId, idUser = user1.idUser, Number = usernumber, Status = "in queue", Time_queue = System.DateTime.Now };
            usernumber++;
            Queue queue2 = new Queue { EventId = Event1.EventId, idUser = user2.idUser, Number = usernumber, Status = "in queue", Time_queue = System.DateTime.Now };
            usernumber++;
            Queue queue3 = new Queue { EventId = Event1.EventId, idUser = user3.idUser, Number = usernumber, Status = "in queue", Time_queue = System.DateTime.Now };
            usernumber++;
            Queue queue4 = new Queue { EventId = Event1.EventId, idUser = user4.idUser, Number = usernumber, Status = "in queue", Time_queue = System.DateTime.Now };
            _context.Add(queue1);
            _context.Add(queue2);
            _context.Add(queue3);
            _context.Add(queue4);
            _context.SaveChanges();
        }
    }
}