using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System;
using QuiQue.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace QuiQue.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        private QuickQueueContext _context;

        private readonly IJWTAuthenticationManager _JWTAuthenticationManager;

        private readonly ITokenManager _tokenManager;

        public AuthController(QuickQueueContext context, ILogger<AuthController> logger, IJWTAuthenticationManager jWTAuthenticationManager, ITokenManager tokenManager)
        {
            _context = context;
            _logger = logger;
            _JWTAuthenticationManager = jWTAuthenticationManager;
            _tokenManager = tokenManager;
        }


        [HttpPost("/Login")]
        public async Task<IActionResult> Authenticate([FromBody] UserCredentials userCred)
        {
            var token = await _JWTAuthenticationManager.Authenticate(userCred.Email, userCred.Password);

            if (token == null)
                return Unauthorized();

            return Ok(token);
        }

        [HttpPost("/Register")]
        public async Task<IActionResult> Register(User user)
        {
            bool registration_result = await _JWTAuthenticationManager.Registration(user);

            if (!registration_result) // пошта зайнята іншим користувачем?
                return new ConflictObjectResult("Wrong credentials provided! (check your email/username/password and try again");

            return new OkObjectResult(user);
        }
        	
        [HttpPost("/logout")]
        public async Task<IActionResult> CancelAccessToken()
        {
            await _tokenManager.DeactivateCurrentAsync();

            return NoContent();
        }
    }
}
