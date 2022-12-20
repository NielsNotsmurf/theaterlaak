using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Data.Migrations
{
    public partial class entitiesmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Betrokkenen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TypePersoon = table.Column<int>(type: "INTEGER", nullable: false),
                    Beschrijving = table.Column<string>(type: "TEXT", nullable: false),
                    Afbeelding = table.Column<string>(type: "TEXT", nullable: false),
                    GeboorteDatum = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Betrokkenen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reserveringen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reserveringen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zalen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zalen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stoelen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Rij = table.Column<int>(type: "INTEGER", nullable: false),
                    ZitPlaats = table.Column<int>(type: "INTEGER", nullable: false),
                    Bezet = table.Column<bool>(type: "INTEGER", nullable: false),
                    ZaalId = table.Column<int>(type: "INTEGER", nullable: true),
                    ZaalId1 = table.Column<int>(type: "INTEGER", nullable: true),
                    ZaalId2 = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stoelen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stoelen_Zalen_ZaalId",
                        column: x => x.ZaalId,
                        principalTable: "Zalen",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Stoelen_Zalen_ZaalId1",
                        column: x => x.ZaalId1,
                        principalTable: "Zalen",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Stoelen_Zalen_ZaalId2",
                        column: x => x.ZaalId2,
                        principalTable: "Zalen",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Voorstellingen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Datum = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ZaalId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voorstellingen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Voorstellingen_Zalen_ZaalId",
                        column: x => x.ZaalId,
                        principalTable: "Zalen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stoelen_ZaalId",
                table: "Stoelen",
                column: "ZaalId");

            migrationBuilder.CreateIndex(
                name: "IX_Stoelen_ZaalId1",
                table: "Stoelen",
                column: "ZaalId1");

            migrationBuilder.CreateIndex(
                name: "IX_Stoelen_ZaalId2",
                table: "Stoelen",
                column: "ZaalId2");

            migrationBuilder.CreateIndex(
                name: "IX_Voorstellingen_ZaalId",
                table: "Voorstellingen",
                column: "ZaalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Betrokkenen");

            migrationBuilder.DropTable(
                name: "Reserveringen");

            migrationBuilder.DropTable(
                name: "Stoelen");

            migrationBuilder.DropTable(
                name: "Voorstellingen");

            migrationBuilder.DropTable(
                name: "Zalen");
        }
    }
}
