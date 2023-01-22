using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Migrations
{
    public partial class DonatieTokenMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "JwtDonatieToken",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JwtDonatieToken",
                table: "AspNetUsers");
        }
    }
}
