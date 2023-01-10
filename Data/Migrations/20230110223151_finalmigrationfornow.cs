using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Migrations
{
    public partial class finalmigrationfornow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reservering",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    UserEmail = table.Column<string>(type: "TEXT", nullable: true),
                    ZaalPlaats = table.Column<int>(type: "INTEGER", nullable: true),
                    MomentId = table.Column<int>(type: "INTEGER", nullable: false),
                    ZaalId = table.Column<int>(type: "INTEGER", nullable: true),
                    ApplicationUserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservering", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservering_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Stoel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Rij = table.Column<int>(type: "INTEGER", nullable: false),
                    ZitPlaats = table.Column<int>(type: "INTEGER", nullable: false),
                    StoelRang = table.Column<int>(type: "INTEGER", nullable: false),
                    Bezet = table.Column<bool>(type: "INTEGER", nullable: false),
                    ReserveringId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stoel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stoel_Reservering_ReserveringId",
                        column: x => x.ReserveringId,
                        principalTable: "Reservering",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservering_ApplicationUserId",
                table: "Reservering",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Stoel_ReserveringId",
                table: "Stoel",
                column: "ReserveringId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stoel");

            migrationBuilder.DropTable(
                name: "Reservering");
        }
    }
}
