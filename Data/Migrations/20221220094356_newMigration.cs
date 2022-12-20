using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Data.Migrations
{
    public partial class newMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Titel",
                table: "Voorstellingen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Reserveringen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Reserveringen",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VoorstellingId",
                table: "Reserveringen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reserveringen_UserId1",
                table: "Reserveringen",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Reserveringen_VoorstellingId",
                table: "Reserveringen",
                column: "VoorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reserveringen_AspNetUsers_UserId1",
                table: "Reserveringen",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reserveringen_Voorstellingen_VoorstellingId",
                table: "Reserveringen",
                column: "VoorstellingId",
                principalTable: "Voorstellingen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reserveringen_AspNetUsers_UserId1",
                table: "Reserveringen");

            migrationBuilder.DropForeignKey(
                name: "FK_Reserveringen_Voorstellingen_VoorstellingId",
                table: "Reserveringen");

            migrationBuilder.DropIndex(
                name: "IX_Reserveringen_UserId1",
                table: "Reserveringen");

            migrationBuilder.DropIndex(
                name: "IX_Reserveringen_VoorstellingId",
                table: "Reserveringen");

            migrationBuilder.DropColumn(
                name: "Titel",
                table: "Voorstellingen");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Reserveringen");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Reserveringen");

            migrationBuilder.DropColumn(
                name: "VoorstellingId",
                table: "Reserveringen");
        }
    }
}
