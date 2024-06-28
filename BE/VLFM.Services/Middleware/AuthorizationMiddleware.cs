using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Services.Interfaces;

namespace VLFM.Services.Middleware
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context, IUserService userService, IJwtService jwtService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            
            if (token != null)
            {
                var userId = jwtService.ValidateJwtToken(token);
                if (userId != null)
                {
                    var user = await userService.GetCurrentUser(token);
                    if (user != null)
                    {
                        var accessURL = context.Request.Path.ToString().ToLower();
                        if (user.PermissionURL.Contains(accessURL))
                        {
                            // Người dùng có quyền truy cập
                            await _next(context);
                            return;
                        }
                    }
                }
            }


            // Nếu không có quyền truy cập, trả về 403 Forbidden
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Forbidden: Bạn không có quyền truy cập");
        }
    }
}
