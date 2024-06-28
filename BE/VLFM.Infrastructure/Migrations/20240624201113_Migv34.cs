using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLFM.Infrastructure.Migrations
{
    public partial class Migv34 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProposeReturnAt",
                table: "DeviceReturns");

            migrationBuilder.DropColumn(
                name: "ProposeReturnContent",
                table: "DeviceReturns");

            migrationBuilder.DropColumn(
                name: "ProposeReturnStatus",
                table: "DeviceReturns");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ProposeReturnAt",
                table: "DeviceReturns",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProposeReturnContent",
                table: "DeviceReturns",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProposeReturnStatus",
                table: "DeviceReturns",
                type: "int",
                nullable: true);
        }
    }
}
