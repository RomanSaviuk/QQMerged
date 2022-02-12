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

        [Route("[controller]/add_date")]
        [HttpGet]
        public IActionResult Get()
        {
            Date();
            return Ok("I add your date");
        }

        [Authorize]
        [Route("/1234")]
        [HttpGet]
        public IActionResult GetAgain()
        {
            var userId = User.FindFirst(ClaimTypes.Email).Value;
            List<Queue> queue = _context.Queues.Where(c => c.EventId == 3).ToList();
            List<User> users = new List<User>();
            foreach (Queue i in queue)
            {
                User user = _context.Users.First(c => c.idUser == i.idUser);
                users.Add(user);
            }
            return new OkObjectResult(users);
        }

        [HttpPut]
        public IActionResult PutUser(User user)
        {
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

        [Route("/event/{idEvent}")]
        [HttpGet]
        public IActionResult GetEvent([FromRoute] Int64 idEvent)
        {
            Event Event = _context.Events.FirstOrDefault(e => e.EventId == idEvent);
            if (Event == null)
            {
                return NoContent();
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
            _JWTAuthenticationManager.Registration(user1);
            _JWTAuthenticationManager.Registration(user2);
            _JWTAuthenticationManager.Registration(user3);
            _JWTAuthenticationManager.Registration(user4);
            _JWTAuthenticationManager.Registration(user5);
            _JWTAuthenticationManager.Registration(user6);

            Event Event1 = new Event { OwnerId = user5.idUser, Title = "string", isFastQueue = true, IsSuspended = false, Description = "string", WaitingTimer = "string" };
            Event Event2 = new Event { OwnerId = user6.idUser, Title = "string", isFastQueue = true, IsSuspended = false, Description = "string", WaitingTimer = "string" };
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