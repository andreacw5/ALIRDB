# ALIRBD

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fandreacw5%2FALIRDB.svg?type=small)](https://app.fossa.io/projects/git%2Bgithub.com%2Fandreacw5%2FALIRDB?ref=badge_small)

###### STATS: 112 richieste fallite - 295 ricerche utenti - 1385 richieste totali dal 20 al 31 - 03 2018

Il repo contiene tutto il codice relativo alla pagina di visualizzazione del database di ALIR, disponibile sul sito ([link](https://www.alir.eu/db/dbviewer/)).

L'applicazione è creata per permettere un monitoraggio costante sia da parte degli utenti, sia da parte dell'amministrazione che in pochi secondi anche senza disponibilità di database alla mano possono controllare un'utente o una gang tranquillamente dal proprio browser, da qualunque dispositivo.

L'applicativo è stato testato su **Firefox Quantum 57.0.3 (64 bit)**.

### Pagina principale

Al fine di avere tutto sotto mano, dalla pagina principale è possibile effettuare ricerche sia nella tabella **players** sia nella tabella **gangs**. 

*Ricerca per giocatori*
È possibile ricercare gli utenti per ogni parametro disponibile e salvato, sia esso il nome, l'alias di gioco o il playerid dello stesso.
Se riscontra una corrispondenza sarà possibile visualizzarne i dati direttamente, altrimenti verrà visualizzata la lista con i risultati simili alla ricerca effettuata, in questo modo sarà possibile cercare un'utente anche senza conoscerne il vero nome o l'ultimo usato.

Esempio: Io mi chiamo **Cola** molto spesso in gioco ma l'ultima volta ho giocato come **Elettrodo**, ricercando **Cola** troverà multiple corrispondenze tra cui **Elettrodo** che tra gli alias (gli ultimi nomi usati) conterrà **Cola**!

*Ricerca per gruppi*
Come per gli utenti, sarà possibile ricercare le gang sia con il loro nome, sia con il playerId di un suo componente. 

### Visualizzazione utente

Nella visualizzazione utente sarà possibile visualizzare i seguenti valori:

* Fondo bancario
* Contanti
* Livello donatore
* Gang
* Livello Polizia
* Livello Medici
* Alias usati
* I veicoli dell'utente (Civili, medici e cop)
* Link all'account steam
* Link all'account del forum [ALIR](https://www.alir.eu/) (Se configurato sul forum)
* I capi di accusa dell'utente (Se disponibili)

### Visualizzazione gang

Nella visualizzazione gang sarà possibile visualizzare i seguenti valori:

* Il totale dei membri (Con avviso in caso si raggiunga il limite imposto)
* Il capo della gang
* I membri della stessa (Visualizzandone il nome ed il playerid)

*Nel caso sia ripetuto un membro nella gang 2 volte solo il primo verrà visualizzato con il nome, il secondo mostrerà solo il playerid facilitando la rimozione di player buggati*

### Visualizzazione liste di fazione

Nella visualizzazione delle liste di fazione sarà possibile visualizzare i seguenti valori:

* Il totale dei membri della fazione scelta
* Il nome dei membri stessi con il link alla visualizzazione in dettaglio degli stessi
* Il livello all'interno della stessa
* La divisione di appartenenza (PLK, PdA, Medici)

### Statistiche e dati di riferimento dei valori

Le statistiche visualizzate nella prima pagina permettono di monitorare le dimensioni delle tabelle del nostro server che diventano ogni giorno più grandi <3

I valori vengono raccolti ogni 30 minuti dal database ufficiale del server di ALIR e trasferiti sul server di ALIRDB per l'esposizione tramite API.

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fandreacw5%2FALIRDB.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fandreacw5%2FALIRDB?ref=badge_large)
