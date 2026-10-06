"""ALIRDB local revival: SQLite DB + API compatibile col vecchio backend + file statici.

    python3 server.py            # http://localhost:8000/viewer.html
    python3 server.py --reset    # ricrea e ripopola il DB
"""
import json
import random
import sqlite3
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

ROOT = Path(__file__).parent
DB = ROOT / "db" / "alirdb.sqlite"
PORT = 8000

PLAYER_COLS = "pid AS playerid, name, aliases, cash, bankacc, coplevel, mediclevel, adminlevel, donorlevel"

FIRST = ["Marco", "Luca", "Giovanni", "Alessandro", "Francesco", "Matteo", "Lorenzo", "Davide", "Simone", "Federico",
         "Riccardo", "Andrea", "Gabriele", "Tommaso", "Stefano", "Paolo", "Salvatore", "Antonio", "Giulia", "Sara",
         "Chiara", "Martina", "Elena", "Valentina", "Michele", "Fabio", "Emanuele", "Daniele", "Pietro", "Vincenzo"]
LAST = ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco",
        "Bruno", "Gallo", "Conti", "De Luca", "Mancini", "Costa", "Giordano", "Rizzo", "Lombardi", "Moretti",
        "Barbieri", "Fontana", "Santoro", "Mariani", "Rinaldi", "Caruso", "Ferrara", "Galli", "Martini", "Leone",
        "Longo", "Gentile", "Martinelli", "Vitale", "Lombardo", "Serra", "Coppola", "De Santis", "D'Angelo", "Marchetti",
        "Parisi", "Villa", "Conte", "Ferraro", "Ferri", "Fabbri", "Bianco", "Marini", "Grasso", "Valentini",
        "Messina", "Sala", "De Angelis", "Gatti", "Pellegrini", "Palumbo", "Sanna", "Farina", "Rizzi", "Monti"]
NICKS = ["Zio Pino", "Il Barone", "Scheggia", "Ghost", "Fulmine", "Tarantola", "Volpe", "Lupo",
         "Tank", "Sniper", "Pistacchio", "Gnocco", "Er Pantera", "Cobra", "Bomber", "Tornado", "Ninja", "Shadow",
         "Rambo", "Gattone", "Pinguino", "Diablo", "Falco", "Joker", "Panzer", "Vipera", "Mamba", "Zorro", "Kaiser",
         "Squalo", "Bufalo", "Corvo", "Mastino", "Rospo", "Tigre", "Orso", "Polpetta", "Spritz"]
GANGS = ["Cartello di Kavala", "Sacra Corona Altis", "Los Pollos Hermanos", "Famiglia Corleone", "Banda della Magliana",
         "Pyrgos Cartel", "I Lupi di Sofia", "Black Mamba", "Nuova Camorra Athira", "Zeta Crew"]
# Gang generate: prefisso + territorio di Altis
GANG_PREFIX = ["Cartello", "Banda", "Famiglia", "Clan", "Crew", "Fratellanza", "Sindacato", "Lupi", "Corvi", "Squali",
               "Vipere", "Cobra", "Ombre", "Diavoli", "Mastini", "Falchi"]
GANG_PLACE = ["di Kavala", "di Pyrgos", "di Athira", "di Sofia", "di Neochori", "di Zaros", "di Paros", "di Charkia",
              "di Agios", "di Molos", "del Porto", "del Nord", "del Sud", "dell'Isola", "delle Saline", "di Telos"]
N_PLAYERS = 3300
VETERAN = "76561198012345678"
VETERAN_GARAGE = [("O_MRAP_02_F", "Car", "CO000LA", "Nero"), ("B_LSV_01_unarmed_black_F", "Car", "EL707TR", "Nero"),
                  ("C_SUV_01_F", "Car", "AL112IR", "Rosso"), ("C_Hatchback_01_sport_F", "Car", "KV918CL", "Giallo"),
                  ("B_Heli_Light_01_stripped_F", "Air", "CL444AA", "Nero"), ("C_Heli_Light_01_civil_F", "Air", "PY201EL", "Bianco"),
                  ("C_Boat_Civil_01_F", "Ship", "MR055CO", "Blu")]
VEHICLES = {
    "civ": [("C_Offroad_01_F", "Car"), ("C_SUV_01_F", "Car"), ("C_Hatchback_01_sport_F", "Car"),
            ("B_Quadbike_01_F", "Car"), ("C_Van_01_box_F", "Car"), ("B_Truck_01_box_F", "Car"),
            ("O_Truck_03_covered_F", "Car"), ("C_Heli_Light_01_civil_F", "Air"), ("B_Heli_Light_01_stripped_F", "Air"),
            ("O_Heli_Light_02_unarmed_F", "Air"), ("C_Boat_Civil_01_F", "Ship"), ("C_Rubberboat", "Ship"),
            ("O_MRAP_02_F", "Car"), ("B_LSV_01_unarmed_black_F", "Car")],
    "cop": [("C_Offroad_01_F", "Car"), ("C_SUV_01_F", "Car"), ("C_Hatchback_01_sport_F", "Car"),
            ("B_MRAP_01_F", "Car"), ("B_Heli_Light_01_F", "Air"), ("B_Heli_Transport_01_F", "Air"),
            ("B_Boat_Armed_01_minigun_F", "Ship")],
    "med": [("C_Offroad_01_F", "Car"), ("C_SUV_01_F", "Car"), ("C_Van_02_transport_F", "Car"),
            ("O_Heli_Light_02_unarmed_F", "Air"), ("O_Heli_Transport_04_medevac_black_F", "Air"),
            ("C_Boat_Civil_01_rescue_F", "Ship")],
}
COLORS = ["Nero", "Bianco", "Rosso", "Blu", "Grigio", "Verde", "Giallo", "Arancione", "Carabinieri", "Polizia"]
# Multe di chargesArray in js/alirdb.js; il frontend legge chargesArray[indice + 1]
FINES = [1000, 300, 400, 1000, 2000, 3000, 5000, 9000, 120, 75, 220, 500, 500, 1000, 1500, 2000, 50, 10000, 10000,
         5000, 2500, 2000, 4000, 8000, 5000, 7500, 10000, 4000, 4000, 2500, 5000, 3500, 6000, 5000, 7500, 2500, 2000,
         2000, 10000, 2500, 4000, 2500, 1500, 7500, 1000, 5000, 1000, 750, 1500, 50000, 2500, 700, 500]
# pid dello staff supporter (supportTeamList in js/alirdb.js)
SUPPORTERS = ["76561198140659293", "76561198093943497", "76561198036665850", "76561198080431444"]


def seed(con):
    rnd = random.Random(2018)
    pids = SUPPORTERS + list(dict.fromkeys(str(76561197960265728 + rnd.randrange(10**9)) for _ in range(N_PLAYERS + 50)))
    pids = pids[:N_PLAYERS - 1]
    players = []
    for i, pid in enumerate(pids):
        if rnd.random() < 0.25:  # nickname da gamer al posto del nome RP
            name = rnd.choice([f"{rnd.choice(NICKS)}{rnd.randint(1, 99)}", f"xX_{rnd.choice(NICKS)}_Xx",
                               f"{rnd.choice(NICKS)} {rnd.choice(LAST)}"])
        else:
            name = f"{rnd.choice(FIRST)} {rnd.choice(LAST)}"
        aliases = ", ".join(rnd.sample(NICKS, rnd.randint(0, 3)) + [name])
        # ~80 carabinieri a piramide di gradi, ~40 medici, 10 admin (il frontend li mostra fissi a 10)
        cop = str(rnd.choice([1] * 8 + [2] * 6 + [3] * 5 + [4] * 4 + [5] * 3 + [6] * 2 + [7, 8, 9, 10])) if i % 40 == 3 else "0"
        if cop != "0" and i % 120 == 3:
            name = "[PLK] " + name  # Polizia Locale, riconosciuta dal frontend
        med = str(rnd.choice([1, 1, 1, 2, 2, 3, 3, 4, 5])) if i % 80 == 21 else "0"
        admin = str(rnd.randint(1, 5)) if 10 <= i < 20 else "0"
        donor = rnd.choice("0" * 18 + "1112")
        cash = int(rnd.paretovariate(1.5) * 2000) % 500_000
        bank = int(rnd.paretovariate(1.2) * 40_000) % 50_000_000
        players.append((pid, name, aliases, cash, bank, cop, med, admin, donor))
    # Il veterano dell'esempio nel README: oggi è Elettrodo, ma per tutti era "Cola"
    players.append((VETERAN, "Elettrodo", "Cola, Elettrodo", 87_350, 12_480_000, "0", "0", "0", "2"))
    con.executemany("INSERT INTO players (pid,name,aliases,cash,bankacc,coplevel,mediclevel,adminlevel,donorlevel) "
                    "VALUES (?,?,?,?,?,?,?,?,?)", players)

    civs = [p[0] for p in players if p[5] == "0" and p[6] == "0" and p[0] != VETERAN]
    rnd.shuffle(civs)
    extra = rnd.sample([f"{a} {b}" for a in GANG_PREFIX for b in GANG_PLACE if f"{a} {b}" not in GANGS], 110)
    for gname in GANGS + extra:
        size = rnd.choice([4, 6, 8, 10, 11, 13])  # 13 fa scattare l'avviso limite
        members = [civs.pop() for _ in range(size)]
        if gname == "Cartello di Kavala":
            members = [VETERAN] + members[:11]  # Cola è il boss storico
        con.execute("INSERT INTO gangs (owner,name,members,bank) VALUES (?,?,?,?)",
                    (members[0], gname, json.dumps(members), rnd.randrange(0, 2_000_000)))

    for cls, typ, plate, color in VETERAN_GARAGE:
        con.execute("INSERT INTO vehicles (side,classname,type,pid,plate,color) VALUES ('civ',?,?,?,?,?)",
                    (cls, typ, VETERAN, plate, color))
    for pid, *_, cop, med, _a, _d in players[:-1]:
        side = "cop" if cop != "0" else "med" if med != "0" else "civ"
        for _ in range(rnd.randint(0, 5)):
            cls, typ = rnd.choice(VEHICLES[side])
            plate = f"{rnd.choice('ABCDEFGHLMNPRSTVZ')}{rnd.choice('ABCDEFGHLMNPRSTVZ')}{rnd.randint(100, 999)}" \
                    f"{rnd.choice('ABCDEFGHLMNPRSTVZ')}{rnd.choice('ABCDEFGHLMNPRSTVZ')}"
            con.execute("INSERT INTO vehicles (side,classname,type,pid,plate,color) VALUES (?,?,?,?,?,?)",
                        (side, cls, typ, pid, plate, rnd.choice(COLORS)))

    wanted = [p for p in players if p[5] == "0"]
    for pid, name, *_ in rnd.sample(wanted[:-1], 400):
        crimes = rnd.sample(range(len(FINES) - 1), rnd.randint(1, 6))
        con.execute("INSERT OR REPLACE INTO wanted VALUES (?,?,?,?,?)",
                    (pid, name, json.dumps(crimes), sum(FINES[c + 1] for c in crimes), rnd.choice([1, 1, 1, 0])))
    # Competizioni illegali, Oltre i 60 km/h, Rapina, Traffico di droga, Fuga dalla polizia
    crimes = [-1, 6, 21, 25, 35]
    con.execute("INSERT INTO wanted VALUES (?,?,?,?,1)",
                (VETERAN, "Elettrodo", json.dumps(crimes), sum(FINES[c + 1] for c in crimes)))


def connect(reset=False):
    if reset:
        DB.unlink(missing_ok=True)
    fresh = not DB.exists()
    con = sqlite3.connect(DB, check_same_thread=False)
    con.row_factory = sqlite3.Row
    if fresh:
        con.executescript((ROOT / "db" / "schema.sql").read_text())
        seed(con)
        con.commit()
    return con


con = connect("--reset" in sys.argv)


def q(sql, *args):
    return [dict(r) for r in con.execute(sql, args)]


def count(table):
    return {"size": con.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]}


def gangs(where, *args):
    rows = q(f"SELECT name, owner, members FROM gangs WHERE {where}", *args)
    for r in rows:
        r["members"] = json.loads(r["members"])
    return rows


def route(path, query):
    parts = [unquote(p) for p in path.strip("/").split("/")]
    head, rest = parts[0], parts[1:]
    if rest and rest[0] == "lenght":  # sic, typo dell'API originale
        return count({"players": "players", "gangs": "gangs", "vehicles": "vehicles", "wanted": "wanted"}[head])
    if head == "players" and rest[:1] == ["name"] and len(rest) == 2:
        like = f"%{rest[1]}%"
        return q(f"SELECT {PLAYER_COLS} FROM players WHERE name LIKE ? OR aliases LIKE ? ORDER BY name", like, like)
    if head == "players" and len(rest) == 1:
        return q(f"SELECT {PLAYER_COLS} FROM players WHERE pid = ?", rest[0])
    if head == "gangs" and rest[:1] == ["id"] and len(rest) == 2:
        return gangs("EXISTS (SELECT 1 FROM json_each(members) WHERE value = ?)", rest[1])
    if head == "gangs" and len(rest) == 1:
        exact = gangs("name = ? OR owner = ?", rest[0], rest[0])
        return exact or gangs("name LIKE ?", f"%{rest[0]}%")
    if head == "vehicles" and len(rest) == 1:
        return q("SELECT side, classname, type, plate, color FROM vehicles WHERE pid = ? AND alive = 1", rest[0])
    if head == "wanted" and not rest:
        pid = query.get("q", [""])[0]
        rows = con.execute("SELECT wantedID, wantedName, wantedCrimes, wantedBounty, active FROM wanted WHERE wantedID = ?",
                           (pid,)).fetchall()
        return [[r[0], r[1], json.loads(r[2]), r[3], r[4]] for r in rows]
    if head == "lists" and rest in (["cop"], ["med"]):
        col = "coplevel" if rest[0] == "cop" else "mediclevel"
        return q(f"SELECT {PLAYER_COLS} FROM players WHERE {col} != '0' ORDER BY CAST({col} AS INT) DESC, name")
    if head == "lists" and rest[:1] == ["donor"] and len(rest) == 2:
        return q(f"SELECT {PLAYER_COLS} FROM players WHERE donorlevel = ? ORDER BY name", rest[1])
    if head == "donor" and rest == ["stats"]:
        c = dict(con.execute("SELECT donorlevel, COUNT(*) FROM players GROUP BY donorlevel").fetchall())
        return {"onelev": c.get("1", 0), "twolev": c.get("2", 0)}
    return None


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def do_GET(self):
        url = urlparse(self.path)
        if url.path.split("/")[1] in ("players", "gangs", "vehicles", "wanted", "lists", "donor"):
            data = route(url.path, parse_qs(url.query))
            body = json.dumps(data).encode()
            self.send_response(200 if data is not None else 404)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()


if __name__ == "__main__":
    print(f"ALIRDB su http://localhost:{PORT}/viewer.html")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
