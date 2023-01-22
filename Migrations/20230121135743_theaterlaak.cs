using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Migrations
{
    public partial class theaterlaak : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoelId",
                table: "Reserveringen");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoelId",
                table: "Reserveringen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
