using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuiQue.Service;

namespace QuiQue.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetQueueTestController : ControllerBase
    {
        private readonly ILogger<GetQueueTestController> _logger;

        IEmailSender _emailSender;
        public GetQueueTestController(ILogger<GetQueueTestController> logger, IEmailSender emailSender)
        {
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpGet]
        public IEnumerable<QueueTest> Get()
        {
            return Enumerable.Range(1, 30).Select(index => new QueueTest
            {
                name = "User Name " + index.ToString()
            })
            .ToArray();
        }
        [Route("/sendEmail/{email}")]
        [HttpGet]
        public async Task<IActionResult> SendEmail([FromRoute] string email)
        {
            //string email = "yuriy.pukhta@gmail.com";
            string messageStatus = await _emailSender.SendEmailAsync(email);
            return Ok(messageStatus);
        }
    }
}
