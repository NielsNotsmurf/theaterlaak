using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Data.Migrations
{
    public partial class datetimemigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Datum",
                table: "Momenten",
                newName: "StartDateTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDateTime",
                table: "Momenten",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDateTime",
                table: "Momenten");

            migrationBuilder.RenameColumn(
                name: "StartDateTime",
                table: "Momenten",
                newName: "Datum");
        }
    }
}
