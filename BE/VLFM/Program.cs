using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VLFM.Infrastructure;
using VLFM.Infrastructure.ServiceExtension;
using VLFM.Services;
using VLFM.Services.Interfaces;
using VLFM.Services.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(
    "Server=MSI;Database=vlfmdb;User Id=sa;Password=12345;Persist Security Info=True"));
builder.Services.AddDIServices();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IPropertyTypeService, PropertyTypeService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IStatusService, StatusService>();
builder.Services.AddScoped<IProposeService, ProposeService>();
builder.Services.AddScoped<IProviderService, ProviderService>();
builder.Services.AddScoped<IReceiptService, ReceiptService>();
builder.Services.AddScoped<IDetailedReceiptService, DetailedReceiptService>();
builder.Services.AddScoped<IPropertyImportService, PropertyImportService>();
builder.Services.AddScoped<IDeviceAssignmentService, DeviceAssignmentService>();
builder.Services.AddScoped<IDeviceReturnService, DeviceReturnService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IAccessService, AccessService>();
builder.Services.AddScoped<IStatisticService, StatisticService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

/*app.UseWhen(context => context.Request.Path.StartsWithSegments("/api/user/currentUser"), app =>
{
    app.UseMiddleware<AuthorizationMiddleware>();
});*/   

app.UseCors(builder => builder
.AllowAnyHeader()
.AllowAnyMethod()
.SetIsOriginAllowed((host) => true)
.AllowCredentials());


app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
