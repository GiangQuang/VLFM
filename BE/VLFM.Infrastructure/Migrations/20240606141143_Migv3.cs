using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLFM.Infrastructure.Migrations
{
    public partial class Migv3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PropertyImports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropImportID = table.Column<string>(type: "nvarchar(44)", maxLength: 44, nullable: false),
                    DtReceiptID = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    PropertyID = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    WarrantydayAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WarrantydayEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StatusID = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyImports", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PropertyImports");
        }
    }
}
