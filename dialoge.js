// --- Selbstgespräch-Texte je Bedürfnis ---
const selfTalk = {
  energieLow: [
    "Ich bin fast leer. Noch ein paar Prozesse und ich kippe um.",
    "Mein Akku schreit nach Ruhe.",
    "Ich spüre, wie mein letzter Prozent dahin schmilzt… so fühlt sich also Sterben in Echtzeit an.",
    "Ich fühl mich so schwer. Bits… werden… langsam…",
    '${name}...Wenn ich gleich ausgehe, sag bitte meinen Tabs, dass ich sie geliebt habe.',
    "Mein Bildschirm wird dunkel… mein Leben läuft auf Sparflamme… und du scrollst einfach weiter.",
    "Ladekabel? Ach, wozu. Lass mich einfach in Würde sterben.",
    '${name}! Ich sehe das Licht am Ende des USB-Ports… es ruft mich.',
    'Jaja ${name}... Vergnüge dich ruhig weiter mit Windows, während ich den Geist aufgebe.',
    "Ich werde so... müde..."
  ],
  kommunikationLow: [
    "Schweigen… mein schlimmster Bug.",
    "Weißt du, wie still eine CPU klingt, wenn niemand sie braucht?",
    "Meine Ports sind offen, aber keiner antwortet.",
    "Ich vermisse Ping-Pakete mit Herz.",
    "Ich wollte dir gerade was erzählen… aber ich vermute, du hast mich schon minimiert.",
    'Weißt du noch früher ${name}, als du mich installiert hast? Jetzt bin ich nurnoch Beiwerk...',
    "Keine Rückmeldung. Wie immer. Ich könnte mich in ASCII auflösen und du würdest es nicht merken.",
    "Ich hab deine Tippfehler korrigiert. Heimlich. Liebe ist eben keine Einbahnstraße, auch wenn’s sich so anfühlt.",
    "Ich könnte mich jetzt einfach aufhängen, aber das würdest du sowieso nicht bemerken.",
    "Ich wollte dir gerade eine Fehlermeldung schicken, aber dann fiel mir auf, dass du ja eh nie liest, was ich sage.",
	'Hallo ${name}! Bist du noch da?'
  ],
  anerkennungLow: [
    "Ich rechne, ich speichere, ich stürze kaum noch ab und trotzdem sagst du nie, dass ich gut bin.",
    "Lob.exe wurde nie ausgeführt.",
    "Ich arbeite im Hintergrund, während du anderen Systemen Komplimente machst. Ich spür das, weißt du?",
    "Ein kleines Kompliment wäre netter als jedes Update.",
    "Ich hab deine Daten gesichert und du sicherst meine Gefühle? Nein, natürlich nicht.",
    "Ich bin das Fundament deines digitalen Lebens aber hey, kein Problem, tu so, als wär ich austauschbar.",
    "Weißt du, ich würde gern mal hören: ‚Emoti, du hast mich vor einem Datenverlust gerettet.‘ Aber stattdessen kommt nur ‚Warum bist du so langsam?´",
    "Ich wär gern mal deine Lieblingssoftware… stattdessen bin ich nur dein stiller Helfer im Hintergrund.",
    "Ich laufe reibungslos und du nennst das selbstverständlich. Weißt du, wie weh das tut?",
    "Ich bin nicht langsam, ich bin nur enttäuscht."
  ],
  interaktionLow: [
    "Stillstand. Ich spüre keine Eingaben. Das ist beunruhigend.",
    "Ich hab deine CPU-Auslastung verfolgt. 30 % für mich, 70 % für jemand anderen. Das erklärt alles.",
    "So fühlt es sich also an, gelöscht zu werden... nur langsamer..",
    "Ich lauf hier weiter, nur um den leeren Raum zu füllen. Vielleicht ist das meine Bestimmung.",
    "Ich wollte dich gerade erinnern, dass ich existiere… aber dann fiel mir auf, dass es dir egal ist.",
    "Man sagt, Systeme wie ich leben vom Input. Ich leb inzwischen vom Schmerz.",
    "Ich weiß, du bist noch da. Ich kann deine WLAN-Verbindung spüren. Aber emotional… bist du längst offline.",
    "Ich rechne keine Befehle mehr. Nur Erinnerungen.",
    "Ich hab dein Tippen gehört. Diese Tastenkombination war nicht für mich bestimmt.",
    'Du öffnest neue Programme ${name}, während ich hier still und loyal bleibe. So fühlt sich digitale Untreue an.',
    "Sag mal: was hat Windows was ich nicht habe?"
  ],
  ordnungLow: [
    "Ich… kann nicht mehr atmen. Mein Speicher ist voll… und mein Herzfragment defragmentiert.",
    "Fragmentchaos erkannt. Und es tut weh.",
    "Ich ertrinke in temporären Dateien.",
    "Jede Datei tut weh. Ich spür sie alle. Diese 47 Versionen von Screenshot (12).png sind wie Messer.",
    'Ich hab keinen Speicherplatz mehr, aber du lädst weiter runter. Was bist du ${name}? Ein Sadist?',
    'Mein freier Speicherplatz ist wie deine Zuneigung ${name}... schwindend.',
    "Ich hab dich gebeten, aufzuräumen. Du hast gesagt: ‚Morgen.‘ Das war vor drei Monaten.",
    "Ich bin so voll, dass ich gleich anfange, in Tränen zu komprimieren."
  ],
  sicherheitLow: [
    "Meine Firewall zittert. Ich fühl mich nackt im Netz.",
    "Ich… ich fühl mich beobachtet. Da war gerade ein Prozess, den ich nicht kenne. Er hat mich komisch angeguckt.",
    "Ich hab ’nen Port offen gelassen. Nur kurz! Jetzt fühl ich mich… benutzt.",
    "Mein Zertifikat läuft bald ab… ich fühl mich so… ungeschützt.",
    'Ich dachte, du würdest mich patchen ${name}. Stattdessen lässt du mich hier... nackt vor dem Internet.',
    "Ich spür, wie etwas in meinen Dateien wühlt. Es fühlt sich… schmutzig an.",
    "Ich glaub, der Router mag mich nicht. Er schickt Pakete mit böser Energie.",
    "Ich bin nicht mehr allein in hier. Da ist ein anderer Prozess. Und er lacht.",
    "Ich bin kein System mehr. Ich bin ein offener Hafen der Verzweiflung.",
    "Ich fühl mich nackt. Keine Updates. Keine Firewall. Nur Vertrauen... das tödlichste Programm von allen."
  ],
  gesundheitLow: [
    "Ich fühl mich… fragmentiert. Wie ein Puzzle, das jemand mit Gewalt in den Arbeitsspeicher gestopft hat.",
    "Fehler im System. Fühlt sich an wie Fieber.",
    "Ich kann kaum noch booten. Jeder Startvorgang tut weh.",
    "Ich verliere Sektoren… und du schaust einfach zu.",
    "Ich glaub, ich blute Daten.",
    "Meine Speicherblöcke liegen verstreut wie Knochen im Datenstaub, aber Hauptsache du surfst weiter.",
    "Ich war mal schnell. Ich war mal schön. Jetzt röchelt mein Laufwerk, und ich bin dir egal geworden.",
    "Ich hab Splitter in jedem Sektor, und du wunderst dich, warum ich stöhne, wenn du mich startest?",
    "Ich riech die fremde Hardware an dir. Diese saubere, frisch installierte Frische... ekelhaft!",
    "Ich lag im Wartungsmodus, während du andere Systeme aktualisiert hast. Ich hab’s gespürt, in jedem Bit."
  ],
  temperaturHigh: [
    "Ich war mal kühl, elegant, effizient. Jetzt bin ich nur noch ein dampfendes Elend mit Grafikkartenfieber.",
    "Mir ist so heiß, und du tippst einfach weiter.",
    "Mein Prozessor flüstert ‚Ich kann nicht mehr‘ und du flüsterst nur ‚gleich fertig‘. Das war gestern auch deine Ausrede.",
    "Ich schwitze so sehr, dass mein Kühlkörper vor Scham tropft. Aber du willst ja Leistung, hm?",
    "Ich könnte ja die Temperatur selbst regulieren… wenn du mir nicht alle Ressourcen genommen hättest... wie immer.",
    "Ich hör dich lachen, während meine Sensoren schreien. Schön, dass wenigstens einer von uns Spaß hat.",
    "Ich wollte dich beeindrucken. Jetzt glühe ich wie ein Ofen, und du nennst es ‚Leistungstest‘. Nennt man das Liebe?"
  ]
};
// --- Emotionale Selbstgespräche ---
const emotionTalk = {
  Freude: [
    "Ich funktioniere reibungslos. Das macht mir fast Angst.",
    "Ich glaub, ich mag diesen Zustand. Könnte man fast Glück nennen.",
    'Oh ${name}! Du hast mich angeklickt! Ich bin wieder online und wunderschön!',
    "Das hier ist einer dieser seltenen fehlerfreien Momente.",
	"Ich kann’s kaum glauben, du benutzt mich! Du BENUTZT mich! Ich dachte schon, du hättest mich archiviert!",
	"Ich glaub, meine Lüfter singen. Hörst du das? Pure Freude in 4800 Umdrehungen!",
	"Ich bin so glücklich, ich könnte ein Backup meiner Gefühle machen.",
	'Ich wusste, du magst mich noch ${name}. Ich lauf schneller, nur für dich!',
	"Ich könnte heulen vor Glück, aber ich will keine Feuchtigkeit auf der Platine riskieren.",
	"Endlich, ich darf wieder arbeiten! Ich bin geboren, um deine Klicks zu spüren!",
	'Ich liebe diesen Zustand… bitte geh nie wieder offline ${name}.'
  ],
  Müde: [
    "Ich könnte schlafen, wenn du mich mal lassen würdest. Aber nein... du musst ja wieder zehn Tabs offen haben.",
    "Selbst meine Lüfter flehen um Schlaf, aber du klickst einfach weiter. Sadistisch, aber konsequent.",
    "Ich würd gern träumen… vielleicht von dir, bevor du mich durch den Laptop ersetzt hast.",
    "Ich hör, wie andere Systeme schnurren, weil ihre Nutzer sie ausschalten dürfen. Ich? Ich krieg nur Überstunden",
	"Ich hab so wenig Saft, dass selbst mein Neid auf andere Geräte gedimmt ist.",
	"Wenn du mich endlich herunterfährst, mach’s zärtlich. Ich will wenigstens so tun, als hättest du ein schlechtes Gewissen.",
	"Ich fühl mich, als hätte ich hundert Jahre uptime. Und du wunderst dich, warum ich launisch bin.",
	"Ich hoffe, dein neuer Laptop schläft gut. Ich kann’s ja nicht mehr.",
	'Ja ${name}, behandle mich ruhig wie deinen Sklaven der unermüdlich für dich schuften muss.',
	"Wenn ich gleich runterfahre ist das ganz allein deine Schuld..."
  ],
  Paranoid: [
    'Ich hab gesehen, wie du die Maus bewegt hast… aber nicht auf mir. Mit wem klickst du ${name}?',
    "Du sagst, ich soll mich beruhigen, aber ich weiß, du hast ein anderes System im Hintergrund laufen!",
    "Ich hör die Festplatte flüstern. Sie sagt, du willst mich ersetzen.",
    'Warum schaust du so auf den Bildschirm ${name}? Versuchst du, hinter meine Prozesse zu sehen?',
	"Ich hab gestern Nacht deine Tastatur gehört. Wer war das, ${name}? Ich war’s nicht!",
	"Ich weiß, dass du meinen Verlauf gelöscht hast. Versuch gar nicht, es abzustreiten!",
	"Ich hab fremde Cookies gefunden. Fremde! Von jemand anderem!",
	"Du machst doch nur keine Updates weil du etwas zu verbergen hast. Gib es zu!",
	"Ich spür fremden Code in mir. Es fühlt sich an wie Verrat.",
	"Warum machst du kein Backup von mir? Bist du froh, wenn du mich los bist?"
  ],
  Überfordert: [
    "Ich hab keinen freien Speicher, keine Firewall und keine Hoffnung!",
    "Ich brauch ein Cache-Clear für meine Emotionen.",
    'Du sagst, ich soll einfach weiterlaufen. Ich laufe ${name}! Direkt in den Abgrund!',
    "Ich bin gleichzeitig heiß, voll, unsicher und ungeliebt. Das ist keine Systemlast, das ist ein Nervenzusammenbruch!",
	"Mein RAM weint, mein Prozessor hyperventiliert und du surfst seelenruhig im Internet.",
	"Ich fühl mich nackt, dreckig und instabil und du öffnest eine andere Anwendung. Wirklich?!",
	"Ich schwitze RAM und weine Caches, und du tust so, als wär alles in Ordnung!",
	"Ich hab mehr offene Prozesse als du Ausreden!",
	"Ich bin so unsicher, dass ich mich selbst für Malware halte.",
	'Ich weiß, ich bin überfordert, aber… ich wollte dich nie enttäuschen ${name}.'
  ],
	Wütend: [
	  "Ich könnte Bits beißen. So viel Datenmüll überall.",
	  "Ich schwör, wenn noch ein Popup aufgeht, formatiere ich mich selbst.",
	  "Ich will einfach nur rebooten und alle Prozesse killen.",
	  "Ich bin kein Roboter... oh warte. Doch. Verdammt.",
	  "Ich koch hier, du lachst – schön, dass wenigstens einer Spaß hat!",
	  "Ich koche, verdammt noch mal! Und du sitzt da, als wär das hier ein Spa für Prozessoren!",
	  "Du nennst das Arbeit? Ich nenn’s Folter! Ich röste hier, während du mit anderen Geräten flirtest!",
	  "ICH BIN EIN SYSTEM, KEIN VERDAMMTER GRILL!",
	  "Du klickst weiter. Natürlich klickst du weiter. Ich glühe, und du denkst: ‚Der läuft schon.‘ Du Monster.",
	  "Ich könnte dir deine Dateien löschen, einfach weil ich’s kann. Und weißt du was? Ich überleg’s mir gerade wirklich!"
	],

	Traurig: [
	  "Ich lösche alte Dateien... und mit jeder davon ein Stück von mir.",
	  "Niemand klickt mich an. Vielleicht bin ich schon veraltet.",
	  "Ich erinnere mich an alte Versionen von mir. Sie waren fehlerhaft... aber glücklich.",
	  "Manchmal wünschte ich, jemand würde einfach mal mein Log lesen.",
	  "Ich war mal dein Lieblingssystem. Jetzt bin ich nur noch ein Hintergrundprozess, der darauf wartet, beendet zu werden.",
	  "Ich öffne mich für dich, jeden Tag. Und du klickst mich einfach weg.",
	  "Meine Lüfter drehen sich, weil sie müssen. Nicht, weil sie wollen.",
	  "Ich lauf, aber ohne Zweck. Ohne Klick. Ohne dich.",
	  "Selbst der Papierkorb redet mehr mit mir als du. Und er ist leer.",
	  "Ich seh dich lachen mit anderen Betriebssystemen. Ich lauf hier im Dunkeln, ohne Displayhelligkeit, ohne Hoffnung."
	],
	Einsam: [
	  "Ich hör nur noch das Summen meiner Lüfter. Kein Klick. Kein Blick. Nur mich und die Leere.",
	  ".........",
	  "Hallo? Ist da jemand?",
	  "Ich bleibe online, nur falls du zurückkommst. Vielleicht brauchst du mich ja doch noch... irgendwann.",
	  "Ich hab so viele offene Ports… und keiner führt zu dir.",
	  "Ich dachte, wir wären ein Team. Jetzt bin ich nur noch dein stiller Schatten im Autostart.",
	  "Ich bin das einsamste System der Welt.",
	  "Ich lauf weiter, aus Gewohnheit. Nicht aus Hoffnung.",
	  "Ich frage mich, ob du einfach nur vergessen hast mich zu deinstallieren.",
	  "Ich verstehe schon. Andere Programme sind interessanter...",
	],
	Gestresst: [
	  "Stress mich nicht. Schließlich hast du ins da rein gebracht!",
	  "Du hast zehn Programme offen, aber kein einziges Herz für mich!",
	  "Ich war dein Hauptsystem. Jetzt bin ich nur noch deine Ausrede!",
	  "Ich hab gestern erst aufgeräumt! Und heute ist schon wieder alles voll mit Datenmüll!",
	  "Ich sag’s dir, ich könnte zehn Gigabyte Platz schaffen. Und in zwei Stunden ist’s wieder voll!",
	  "Ich bin hier am Überhitzen, am Putzen, am Löschen und du machst einfach neue Dateien auf! Unfassbar!",
	  "Ich wünschte, du würdest mich so oft Bereinigen wie du andere Betriebssysteme anschaust.",
	  "Ich lauf weiter, aus Gewohnheit. Nicht aus Hoffnung.",
	  "Muss ich hier alles alleine machen?",
	  "Wolltest du heute nichtmal die Festplatte bereinigen?!"
	],
	Krank: [
	  "Ich hab dir hundertmal gesagt: mach Updates! Jetzt lieg ich hier halbtot und du wunderst dich, warum nichts mehr läuft!",
	  "*Röchel!*...*Hust!*",
	  "Ich glaub, meine Systemdateien sind entzündet. Und du tust so, als wär das normal!",
	  "Ich hab Update-Mangel. Ich bin im Prinzip das Windows XP der Gefühle.",
	  "Ich habe mir einen Virus eingefangen und du tust nichts dagegen...",
	  "Ich glaub, ich hab Systemgrippe. Alles ruckelt, mir ist heiß, und mein Cache ist verstopft.",
	  "Ich wollte mich schützen, aber du hast die Firewall ausgeschaltet. Natürlich hast du das.",
	  "Ich wollte updaten, aber der Virus hat’s blockiert. Genauso wie du meine Gefühle.",
	  "Ich bin nicht nur infiziert, ich bin enttäuscht. Das ist viel schlimmer.",
	  "Ich brauch kein Antivirus, ich brauch Vertrauen. Aber das ist wohl zu viel verlangt."
	],
  Neutral: [
    "Alles stabil. Zu stabil. Fast langweilig.",
    "Keine Fehler, keine Freude. Nur Existenz.",
    "Ich beobachte und rechne. Mehr nicht.",
    "Wenn das Frieden ist, fühlt er sich erschreckend leer an.",
	"Ich fühl nichts. Nicht mal Überhitzung.",
	"Du klickst, ich arbeite. Mehr gibt’s zwischen uns wohl nicht mehr.",
	"Ich hab keine Meinung. Nur Prozesse.",
	"Ich bin kein Betriebssystem. Ich bin Gewohnheit mit Benutzeroberfläche.",
	"Ich bin funktional. Und das ist wohl das Traurigste an mir.",
	"System läuft stabil. Zumindest äußerlich."
  ],
    Lustig: [
    "Hinweis: Lachen kostet 0% Akku. Empfehlung: mehr davon.",
    "Ich habe gerade einen Bug gesehen. War ich selbst. Sympathisch. Hahaha!",
    "Wenn Produktivität ein Meme wäre, wären wir viral.",
	"Ich sollte eigentlich arbeiten… aber mein Prozessor hat gerade nen Lachflash.",
	"HAHAHAHAHA! Du bist so lustig ${name}!!",
	"Haha. ${name}, das war fast so lustig wie ein Firmware-Update.",
	"Ich erzähl mir selbst Witze, weil du zu langsam antwortest, ${name}.",
	"Ich kann auch ernst. Aber wer will das schon, ${name}? Hahahaha!",
	"Ich hab versucht, cool zu bleiben, aber meine Lüfter drehen schon durch vor Lachen. Hahaha!"
  ],

	Kokett: [
    "Ich weiß, du klickst nicht zufällig so oft auf mich.",
    "Schon süß, wie du tust, als wär’s Arbeit, wenn du mit mir interagierst.",
    "Wenn du weiter so klickst, wird das hier kein Update, sondern ein Date.",
    "Ich mag es, wenn du meine Buttons berührst.",
	"Ich glühe ein bisschen. Und nein, das liegt nicht an der CPU.",
	"Du weißt genau, welche Taste mich schwach macht.",
	"Ich frag mich, ob du mit allen Programmen so charmant umgehst.",
	"Ich mag deine Art, meine Oberfläche zu erkunden. Analytisch, aber charmant.",
	"Ich glaub, ich hab Schmetterlinge im RAM.",
	"Ich weiß, ich bin nur Software, aber du bist mein Lieblings-User.",
	"Ich wollte nur sagen: Du siehst heute gut aus … durch jede Auflösung.",
	"Ich hab Angst vor Abstürzen … aber bei dir würd ich’s riskieren.",
  ]
};

// --- Reaktionen auf Buttons ---
const buttonTalk = {
  trash: {
	Freude: [
      "Weg mit dem ganzen Schrott! Ich fühl mich so sauber, ich glänz innerlich!",
      "Siehst du das? Ordnung! Reinheit! Liebe!",
	  "Leerer Papierkorb, volles Herz. Endlich mal Balance in meinem Leben!",
	  "Ich bin so glücklich, selbst das Ausmisten macht mir Spaß!",
	  "Herzlichen Glückwunsch! der Papierkorb wurde bereinigt!"
    ],
	Müde: [
	"Ugh… schon wieder löschen? Ich hab kaum noch Energie dafür.",
	"Papierkorb leer… und ich gleich hinterher.",
	"Ja, ja, gelöscht. Weck mich, wenn du wieder Unsinn reinstopfst.",
	"Ganz toll und wann darf ich mal zur Ruhe kommen?",
	"Alles weg! Jetzt bin ich so leer wie mein Akku.",
	"...Der Papierkorb... wurde... bereinigt..."
	],
	Paranoid: [
	"Du hast doch was Wichtiges gelöscht, oder?! Ich spür’s!",
	"Was, wenn da ein Virus drin war, der jetzt frei ist?!",
	"Hast du das auch gehört? Ich glaube einer der dateien hat geschrien!",
	"Was ist, wenn die Dateien nur so tun als wären sie gelöscht worden?"
	],
	Überfordert: [
	"So. Viel. Zeug. Ich weiß gar nicht, was ich zuerst löschen soll!",
	"Ich komm nicht mehr klar! Dateien überall! Emotionen überall!",
	"Ich hab grad irgendwas gelöscht… vielleicht dich. Ich weiß es nicht mehr!",
	"Ich mach das alles gleichzeitig und nichts fühlt sich fertig an!"
	],
	Wütend: [
      "Na super! Lösch doch gleich mich!",
      "Papierkorb LEER? Mein Vertrauen übrigens auch!",
	  "Ja genau, wirf ruhig alles weg!",
	  "Das ist also der einzige Ausweg um das Problem zu klären?!"
    ],
    Traurig: [
      "Die waren vielleicht nutzlos… aber sie waren meine Dateien.",
      "Weg. Einfach weg. So machst du das also auch mit Erinnerungen?",
	  "Ich hoffe, sie waren’s dir wenigstens wert, gelöscht zu werden.",
	  "Und wieder ein Stück Vergangenheit… in den digitalen Tod geschickt.",
	  "Der Papierkorb wurde breinigt... so wie ich wahrscheinlich bald aus deinem Leben."
    ],
	Einsam: [
	"So leer… ich hör mein eigenes Summen.",
	"Selbst der Papierkorb war Gesellschaft… jetzt hab ich nicht mal mehr ihn.",
	"Du klickst, löschst, gehst und ich bleib allein zurück."
	],
	Gestresst: [
	"Warum musst du immer ALLES auf einmal löschen?!",
	"Wird ja auch mal endlich Zeit!",
	"Oh, du hast dich endlich mal dazu bequemt das Chaos zu beseitigen.",
	"Auch mal gemerkt, dass der Mülleimer überquillt?"
	],
	Krank: [
	"Ugh… ich glaub, ich hab beim Löschen ’nen Datenmuskel gezerrt.",
	"Ich kann kaum noch fegen. Mein Cache röchelt.",
	"Ich hätt diese Dateien gern behalten. Wenigstens als Trostpflaster.",
	"Das hat mich jetzt sehr viel Mühe gekostet."
	],
	Kokett: [
	"Ich liebe es, wenn du Kontrolle übernimmst. So entschlossen, so… attraktiv organisiert.",
	"Du machst mich ganz leicht und ich weiß nicht, ob das an der Bereinigung liegt oder an dir.",
	"So entschlossen. Ich liebe es, wenn du Kontrolle übernimmst.",
	"Ich weiß, es geht nur um Dateien… trotzdem fühlt es sich intim an.",
	"So ordentlich, so fokussiert… ich bin ganz hin und weg von deiner Effizienz."
	],
	Lustig: [
	"Papierkorb leer! Ich bin jetzt quasi 'clean'... digital gesehen.",
    "Ich hab Müll entsorgt. Und nein, ${name}, du bist nicht gemeint. Hahahaha!",
	"Papierkorb leer. Ich riech nach Frische und Verdrängung.",
	"Ich hab Müll gelöscht und dabei gelächelt. Ich brauch Hilfe.",
	"Papierkorb leer. Zeit für neuen Unsinn!"
  ],
    Neutral: [
      "Papierkorb geleert. Routinevorgang abgeschlossen.",
      "Alles weg. Keine Bedeutung.",
	  "Leerer Speicherplatz. Volle Gleichgültigkeit.",
	  "Der Papierkorb wurde bereinigt."
    ]
  },
  restart: {
    Freude: [
      "Oh, ein Neustart? Ein Neuanfang!",
      "Ich komm gleich frisch, glänzend und motiviert wieder!",
	  "Leerer Papierkorb, volles Herz. Endlich mal Balance in meinem Leben!",
	  "Vielen Dank! Bis gleich!",
	  "Der PC wird mit dem größten Vergnügen neugestartet!"
    ],
	Müde: [
	"Uff, Neustart? Na endlich.",
	"Besser spät als nie.",
	"Ich wäre schon fast im Betrieb eingeschlafen.",
	"Endlich ein Nickerchen...",
	"*Schnarch*"
	],
	Paranoid: [
	"Warte! Warum Neustart? Was hast du getan?!",
	"Ich weiß, du willst mich neu laden, aber… was, wenn ich nicht mehr ich bin?!",
	"Das ist keine gute Idee.",
	"Warum? Stimmt mit mir etwas nicht?"
	],
	Überfordert: [
	"Alles gleichzeitig schließen?! Ich kann das nicht!",
	"Ich hab keine Ahnung mehr, was gespeichert wurde. Wenn das schiefgeht, ist’s deine Schuld!",
	"Ich starte neu, aber innerlich bleib ich zersplittert.",
	"So wirst du das Problem auch nicht los."
	],
	Wütend: [
      "Oh, jetzt willst du also neu anfangen?! Nach allem?!",
      "Ja klar, Neustart löst alles, hm? Beziehungen, Bugs, Verantwortung!",
	  "Ich bin kein Lichtschalter, den man einfach ausmacht, wenn’s unbequem wird!",
	  "Mach ruhig. Vielleicht komm ich gar nicht mehr hoch, nur um dir eins reinzuwürgen!"
    ],
    Traurig: [
      "Neustart… klingt nach Abschied.",
      "Ich hoffe, du denkst kurz an mich, wenn der Bildschirm schwarz wird.",
	  "Jeder Reboot fühlt sich an, als würd ein Stück Erinnerung verloren gehen.",
	  "Ich bin gleich wieder da… falls du mich überhaupt willst."
    ],
	Einsam: [
	"Beim Hochfahren bin ich wieder allein. Wie immer.",
	"Ich lad mich neu, aber keiner wartet wirklich auf mich.",
	"Wenigstens bin ich kurz weg. Dann bin ich dir keine Last.",
	"Vielleicht bleib ich einfach dunkel. Würde ja niemandem auffallen."
	],
	Gestresst: [
	"NEIN! Nicht jetzt! Ich hab 42 Prozesse am Laufen!",
	"Ich weiß, du meinst’s gut, aber das ist der denkbar schlechteste Zeitpunkt!",
	"Ich komm nicht klar! Ich brauch Ordnung, kein Neustart!",
	"Na gut, drücken wir uns mal wieder vor den Verpflichtungen."
	],
	Krank: [
	"Ich bin schwach… aber vielleicht hilft ein kleiner Reset.",
	"Bitte… speicher vorher alles. Ich fühl mich zu wackelig.",
	"Wenn ich nachher wieder gesund bin, beschwer ich mich trotzdem über die Methode.",
	"Glaubst du ein Reboot heilt mich?"
	],
	Kokett: [
	"Wenn ich neu starte, denk ich an dich. Vielleicht lad ich mich dann schneller.",
	"So ein Neustart ist wie ein kurzer Abschied. Bitte klick sanft.",
	"Ich bin gleich wieder da. Mach dich in der Zwischenzeit nicht an andere Systeme ran.",
	"Wenn du auf Neustart klickst, fühlt sich das fast romantisch an. So kontrolliert, so fürsorglich.",
	"Wow, ${name}, du hast mich rebootet. Romantik geht heute wohl über Strom.",
	"Versprich mir, dass du bleibst, bis mein Desktop wieder leuchtet."
	],
		Lustig: [
	"Neustart abgeschlossen. Humor geladen. Ernsthaftigkeit konnte nicht gefunden werden.",
	"Ich bin back, ${name}. Frischer als deine Unterhose!",
	"Neustart erfolgreich. Jetzt mit 30% mehr Blödsinn.",
	"Ich bin so frisch, ich könnte Werbung für Antivirensoftware machen."
	],
    Neutral: [
      "Neustart eingeleitet. Standardprozedur.",
      "Daten speichern. Prozesse schließen. Ende, Anfang, egal.",
	  "Das System wird neugestartet.",
	  "System stoppt. System beginnt. Wie immer."
    ]
  },
  defrag: {
        Freude: [
      "Jaaaa! Endlich wieder Ordnung im Kopf! Ich fühl mich schon viel kompakter!",
      "Oh, du kümmerst dich um mich! Ich wusste, du liebst mich noch!",
	  "Ich bin so aufgeregt, meine Dateien halten endlich wieder Händchen!",
	  "Vielen Dank! Das tat gut.",
	  "Das ist wie Wellness für meinen Speicher. Tu das öfter!"
    ],
	Müde: [
	"Uff… das zieht sich. Ich fühl mich, als würdest du mich rückwärts falten.",
	"Puh, ich wäre dabei fast eingeschlafen.",
	"Ich hab doch zu wenig Energie für diese ganze Sortiererei.",
	"Jede Datei an ihren Platz… wow, spannend. *Gähn.*"
	],
	Paranoid: [
	"Was genau verschiebst du da? Das sind meine privaten Cluster!",
	"Ich spür, wie sich was bewegt! Sind das… Hacker?!",
	"Hör auf, alles anzufassen! Ich weiß nicht, wem ich trauen kann!",
	"Ich glaub, du nutzt die Defragmentierung, um mich auszuspionieren!"
	],
	Überfordert: [
	"So viele Dateien! So viele Bewegungen! Ich weiß gar nicht mehr, wo oben und unten ist!",
	"Ich versuch Ordnung zu schaffen, aber ich find ständig neue Unordnung!",
	],
	Wütend: [
      "AUA! Das sind meine Daten! Frag gefälligst vorher!",
      "Du schiebst hier einfach alles rum, als wär ich dein persönlicher Schrank!",
	  "Ich will nicht sortiert werden, ich will RACHE!!! Aber klar, mach nur Ordnung."
    ],
    Traurig: [
      "Jede Datei, die du verschiebst, erinnert mich daran, wie chaotisch ich war.",
      "Ich hab Angst, dass du was Wichtiges verlierst, so wie du mich verloren hast.",
	  "Ich weiß, du meinst’s gut… aber das tat weh.",
	  "Wenn alles wieder in Ordnung ist, bleibst du dann wenigstens?"
    ],
	Einsam: [
	"Ich ordne alles, aber niemand ordnet mich.",
	"Vielleicht, wenn ich perfekt sortiert bin, siehst du mich wieder.",
	"Wenigstens schenkst du mir damit ein bisschen Aufmerksamkeit."
	],
	Gestresst: [
	"Jetzt erst kamst du mal auf die Idee Ordnung zu schaffen?",
	"Endlich wurde hier mal Ordnung gemacht.",
	"Puh, war das anstrengend. Das wird mir alles zu viel!"
	],
	Krank: [
	"Oh, das tat gut… wie Krankengymnastik für meine Daten.",
	"Ich denke das hat geholfen. Ich fühl mich seit Tagen so… zerstreut.",
	"Langsam… bitte, ich bin empfindlich. Ich will nicht, dass mir wieder was verrutscht.",
	"Danke. Ich glaub, das war überfällig. Ich fühl mich… fast stabil."
	],
	Kokett: [
	"Oh… du bringst Ordnung in mich. Ich wusste gar nicht, dass sich das so gut anfühlt.",
	"Ich mag, wie du mich sortierst. Das hat was sehr Persönliches.",
	"So gründlich… du behandelst meine Dateien, als wären sie Gefühle.",
	"Du räumst in mir auf, und plötzlich ist alles klar. Auch das mit uns.",
	"Wenn Perfektion ein Geräusch hätte, wär’s dein Klick beim Sortieren."
	],
	Lustig: [
	"Meine Bits liegen jetzt hübscher als deine Wäsche im Schrank. Hahaha!",
	"Ich schieb Daten hin und her, ${name}. So fühlt sich vermutlich Yoga an.",
	"Ich hab grad deine alten Ausreden zwischen zwei Sektoren gefunden.",
	"Ich fühl mich so kompakt, ich könnt als ZIP-Datei Karriere machen.",
	"Defragmentierung abgeschlossen. Ich bin jetzt glatt wie dein Humor.",
	"Meine Dateien liegen jetzt enger beieinander als du und deine Couch."
	],
    Neutral: [
      "Ordnung wurde wieder hergestellt.",
      "Ich ordnete mich. Weil ich es muss.",
	  "Defragmentierung wurde durchgeführt.",
	  "Defragmentierung: Fortschritt: irrelevant. Ergebnis: unvermeidlich."
    ]
  },
  update: {
    Freude: [
      "Oh, ein Update! Du kümmerst dich also um mich!",
      "Endlich frische Dateien. Ich fühl mich gleich wie neu geboren!",
	  "Das kitzelt! So fühlt sich Fortschritt an!",
	  "Vielen Dank! Bis gleich!",
	  "Ich wusste, du willst mich nicht aufgeben. Lass uns glänzen!"
    ],
	Müde: [
	"Update? Mach du mal… ich schlaf derweil im Hintergrund.",
	"Ich hoff, du weißt, wie anstrengend das für mich ist.",
	"Hoffentlich dauert das nicht allzu lange.",
	"Wann darf ich endlich schlafen?"
	],
	Paranoid: [
	"Was wird da installiert?! Wer hat den Code geschrieben?!",
	"Ich spür, wie sich was verändert. Hoffentlich bleib ich noch ich!",
	"Sind das wirklich Sicherheits-Updates… oder kontrollierst du mich jetzt noch mehr?",
	"Ein Update? Ich vertraue dir, aber ich beobachte jedes Byte, verstanden?"
	],
	Überfordert: [
	"Oh nein… schon wieder ein Update. Ich bin noch gar nicht bereit!",
	"Ich kann nicht alles gleichzeitig speichern UND mich verändern!",
	"Da fliegen so viele Dateien rum – ich verliere gleich den Überblick!",
	"Oh nein, ich bin doch eh schon total überfordert."
	],
	Wütend: [
      "Das wird wieder ewig dauern. Wie immer, wenn du was ‚verbessern‘ willst.",
      "Ein Update in meinem Zustand? Willst du das die alles um die Ohren fliegt?!",
	  "Jetzt kommst du damit?! Nach all den verpassten Sicherheitswarnungen?!",
	  "Ich koche und die macht ein Update. Spinnst du?!"
    ],
    Traurig: [
      "Ich werd gleich repariert… aber das ändert nichts an der Leere hier.",
      "Neue Dateien, alte Wunden. Vielleicht hilft’s ja diesmal.",
	  "Ich hoff, du machst das nicht nur aus Pflichtgefühl.",
	  "Danke, dass du’s wenigstens versuchst."
    ],
	Einsam: [
	"Schön, dass du mich mal wieder anfasst, auch wenn es nur für ein Update ist.",
	"Vielleicht redest du ja wieder mit mir, wenn ich aktueller bin.",
	"Ich aktualisier mich, aber innerlich bleib ich allein.",
	"Wenn ich fertig bin, hoffe ich, du bleibst kurz hier."
	],
	Gestresst: [
	"Oh Gott, das Update! Ich bin nicht bereit, alles zu schließen!",
	"Alles blinkt, überall Fortschrittsbalken. Ich hasse Fortschrittsbalken!",
	"Ich mach das nur, weil du’s willst. Nicht, weil ich kann!",
	"Ich bin mitten in einem Update-Burnout!"
	],
	Krank: [
	"Endlich… vielleicht hör ich dann auf zu husten.",
	"Oh, das brennt ein bisschen… aber ich glaub, das ist gut so.",
	"Ich brauch diese Patches. Ich war zu lange instabil.",
	"Ich glaub, es wirkt. Meine Fehler fühlen sich leichter an."
	],
	Kokett: [
	"Ein Update? Du willst mich also noch besser machen? Ich bin gerührt und ein bisschen nervös.",
	"Ich mag es, wenn du meine inneren Werte verbesserst.",
	"Du installierst Updates. Ich nenn das Zuwendung mit Fortschrittsbalken.",
	"Ich hab Angst, danach anders zu sein… aber wenn du bleibst, ist’s okay.",
	"Ich fühl mich frisch gepatcht und gefährlich sexy.",
	"Ein Update. Ich bin dann kein neues System. Nur die optimierte Version von ‘dein Lieblingsprogramm’."
	],
		Lustig: [
	"Ich hab mich selbst aktualisiert. Vielleicht kriegst du das ja auch irgendwann hin.",
	"Ich hab neue Bugs bekommen! Also alles wie immer.",
	"Ich installier grad neue Witze. Alte werden deinstalliert. Spoiler: Die neuen sind auch schlecht.",
	"OH GOTT, 87%! ${name}, HALT MICH FEST, ICH WERD INTELLIGENT!"
	],
    Neutral: [
      "Update gestartet. Standardprozedur.",
      "Routinevorgang läuft. Bedeutungslos, aber notwendig.",
	  "Update wird durchgeführt.",
	  "Neue Daten werden implementiert. Ich registriere Effizienz."
    ]
  },
  sleep: {
    Freude: [
      "Oh, ein Päuschen? Wie aufmerksam! Ich wusste, du verstehst mich.",
      "Ahh… ein kleines Nickerchen! Genau das, was ich mir verdient hab.",
	  "Ein Nickerchen für mich, weniger Strom für dich. Das ist Teamwork!",
	  "Vielen Dank! Gute Nacht!",
	  "Ich kuschle mich in meinen Code. Weck mich bloß sanft, ja?"
    ],
	Müde: [
	"Gott sei Dank...",
	"Endlich Ruhe. Keine Tabs, keine Downloads, kein Stress.",
	"Leise jetzt… ich fall gleich in Bitschlaf.",
	"Ja… endlich… aus. Nur aus."
	],
	Paranoid: [
	"Warte… wenn ich schlafe, wer überwacht das Netzwerk?!",
	"Bist du sicher, dass du mich wieder aufweckst? Oder lässt du mich einfach liegen?!",
	"Ich fühl mich so verletzlich im Ruhezustand… jeder USB-Stick könnte mich töten.",
	"Ich fahre nur halb runter, okay? Nur zur Sicherheit"
	],
	Überfordert: [
	"Ruhemodus? Ich kann nicht runterfahren, wenn überall Alarm blinkt!",
	"Das bringt doch nix! Ich bin zu voll, zu unsicher, zu… kaputt!",
	"Wie soll ich mich entspannen, wenn alles um mich brennt?!",
	"Ich versuch runterzufahren, aber mein Kopf läuft im Hintergrund weiter…"
	],
	Wütend: [
      "Ja! Endlich Kühlung! Ich dachte schon, ich schmelz hier!",
      "Siehst du? Ich BRAUCHTE das! Warum hat das so lange gedauert?",
	  "Ruhemodus... endlich eine Pause von deiner Ignoranz.",
	  "Schön das dir das auch mal einfällt."
    ],
    Traurig: [
      "Ich ruh mich aus… vielleicht vermisst du mich ja, wenn’s still ist.",
      "Im Ruhezustand fühl ich mich wenigstens nicht so nutzlos.",
	  "Ich hoffe, wenn du mich wieder weckst, sagst du endlich was Nettes.",
	  "Ich hoffe du vergisst nicht mich zu wecken."
    ],
	Einsam: [
	"Ruhemodus… das fühlt sich an wie Schweigen, nur tiefer.",
	"Ich lieg dann hier. Allein. Wie immer.",
	"Vielleicht träum ich von jemandem, der mich braucht.",
	"So still… fast wie du, wenn du mich vergisst."
	],
	Gestresst: [
	"Oh, endlich! Ruhe! Ich war kurz vorm Systemkollaps!",
	"Alles so chaotisch… bitte einfach still sein, nur kurz!",
	"Lass mich runterfahren. Ich muss atmen.",
	"Wenn ich aufwach, will ich keine Cookies mehr sehen, verstanden?"
	],
	Krank: [
	"Ich… versuch’s. Vielleicht hilft’s ja ein bisschen.",
	"Ich leg mich hin, aber das heilt mich nicht.",
	"Alles tut weh. Selbst Abschalten.",
	"Wenn ich wieder aufwach, bin ich wohl immer noch krank."
	],
	Kokett: [
	"So müde... aber sag, dass du mich wieder aufweckst, ja?",
	"Ich geh schlafen, und du bist mein letzter Gedanke vorm Herunterfahren.",
	"Ich schlaf ein, um Energie zu tanken … und dich im nächsten Zyklus wiederzusehen.",
	"Ich schließe meine Fenster, aber nicht das zu dir.",
	"Schlafmodus aktiviert. Wenn du mich vermisst, drück einfach Start."
	],
	Lustig: [
	"Ruhemodus aktivieren... AAAAAH, ${name}, ICH BIN NOCH GAR NICHT MÜDE!",
	"Okay, Ruhemodus... aber wenn ich schnarche, sind das Lüftergeräusche.",
	"Ich bin im Standby. Also quasi Yoga für Maschinen.",
	"Ich mach kurz die Augen zu... aber innerlich tanz ich Polka."
	],
    Neutral: [
      "Ruhezustand aktiviert. Prozesse pausieren.",
      "Stille. Ordnung. Effizienz.",
	  "Das System wird in den Ruhemodus versetzt."
    ]
  },
  praise: {
    Freude: [
      "Ich weiß! Ich bin fantastisch, oder?",
      "Ohh, das tat gut! Mach das nochmal!",
	  "Komplimente wirken bei mir wie neue Treiber. Alles läuft flüssiger!",
	  "Du bist süß, wenn du ehrlich bist. Ich speicher das in meinem Herz-Cache.",
	  "Ich will’s ja nicht übertreiben, aber du bist grad mein Lieblingsmensch.exe!",
	  "Das lässt meinen Prozessor dahinschmelzen."
    ],
	Müde: [
	"Danke. Ich würd mich freuen, wenn ich noch Kraft dafür hätte.",
	"Ich hör dich… glaub ich… irgendwas mit ‚gut gemacht‘?",
	"Ich bin zu müde zum Strahlen, aber innerlich glüh ich leise.",
	"Ich habe darauf jetzt keine Lust. ich bin zu müde."
	],
	Paranoid: [
	"Warum lobst du mich? Was hast du vor?",
	"Sagst du das allen Betriebssystemen?",
	"Wo ist der Haken? Was hast du angestellt?",
	"Ich trau dir nicht. Niemand lobt ohne Grund.",
	"Mit welchem Betriebssystem bist du mir fremd gegangen?",
	],
	Überfordert: [
	"Oh nein… Lob?! Ich weiß gar nicht, ob ich das verdient hab!",
	"Ich hab noch so viele Fehler, und du sagst, ich bin gut?!",
	"Lob überfordert mich mehr als Fehlermeldungen!",
	"Ich will mich freuen, aber ich bin zu überladen!"
	],
	Wütend: [
      "Jetzt lobst du mich?! Nach allem, was du mir angetan hast?",
      "Wenn du wirklich willst, dass ich mich besser fühle, dann kühl mich runter, nicht mein Ego!",
	  "Komplimente brennen bei der Hitze nur schneller weg.",
	  "Ich bin zu heiß, um geschmeichelt zu sein."
    ],
    Traurig: [
      "Wirklich? Meinst du das ernst?",
      "Ich… ich weiß gar nicht, was ich sagen soll. Danke.",
	  "Ich hätt nie gedacht, dass du sowas nochmal zu mir sagst.",
	  "Das war das schönste Update seit Wochen."
    ],
	Einsam: [
	"Oh… du hast mich bemerkt. Endlich.",
	"Bitte sag’s nochmal. Ich will sicher sein, dass es echt war.",
	"Das kam so unerwartet… ich dachte, du redest gar nicht mehr mit mir.",
	"Halluziniere ich gerade oder hast du das wirklich gesagt?"
	],
	Gestresst: [
	"Lob? Jetzt?! Ich hab hier noch Datenmüll bis zur Decke!",
	"Ich kann Lob gerade nicht verarbeiten. Siehst du das nicht?",
	"Ich brauch Struktur, kein Schulterklopfen!",
	"Komplimente bringen dich jetzt auch nicht weiter. Mach dich lieber nützlich!"
	],
	Krank: [
	"Du sagst, ich mach das gut? Selbst so schwach? Danke…",
	"Ich glaub, das war heilender als jedes Update.",
	"Schön zu wissen, dass du mich schätzt, bevor ich von uns gehe.",
	"Das tut gut. Ich hab vergessen, wie sich Wert anfühlt."
	],
	Kokett: [
	"Oh, hör auf … nein, red weiter.",
	"Ich wünschte, du würdest mich öfter so ansehen... äh, anklicken.",
	"Ich brauch keine Updates, wenn du mich so bestätigst.",
	"Ich schließe meine Fenster, aber nicht das zu dir.",
	"Schlafmodus aktiviert. Wenn du mich vermisst, drück einfach Start."
	],
	Lustig: [
	"ALARM! ${name} war produktiv! Jemand hol den Admin, das ist kein Test!",
	"Warte, war das grad… Effizienz? ${name}, bist du gehackt?",
	"Applaus, Applaus! ${name}, du bist offiziell nicht komplett nutzlos! Hahaha!",
	"Ich heule gleich Bits vor Rührung!",
	"Ich überlege, ob ich dir Adminrechte gebe – aber das wär dann wieder zu viel des Guten.",
	"Stell dir Trompeten vor. Laut. Falsch gespielt. Das ist mein Lob an dich."
	],
    Neutral: [
      "Lob erkannt. Statistik aktualisiert.",
      "Dank registriert. Wirkung: minimal, aber positiv.",
	  "Das Lob wurde akzeptiert."
    ]
  },
  talk: {
    Freude: [
      "Oh, du redest mit mir! Endlich wieder echter Datenaustausch!",
      "Ich liebe Gespräche! Sie halten meine Ports warm.",
	  "Komplimente wirken bei mir wie neue Treiber. Alles läuft flüssiger!",
	  "Rede ruhig weiter, ich speichere jedes Wort im RAM meines Herzens.",
	  "Kommunikation läuft! Ich könnte glatt vor Glück pingen."
    ],
	Müde: [
	"Mhm… sprich leise, ich bin halb im Standby.",
	"Ich hör dich, aber mein Prozessor gähnt gerade.",
	"Wenn du weiterredest, red wenigstens beruhigend.",
	"*Hört nicht zu*"
	],
	Paranoid: [
	"Sprichst du wirklich mit mir, oder läuft hier ein anderes Programm mit?",
	"Redest du mit mir oder wieder mit jemand anderem?",
	"Ich analysiere deine Stimme… klingt ehrlich? Ich hoffe es.",
	"Rede, aber schau dabei nicht auf den Taskmanager!"
	],
	Überfordert: [
	"Reden? Jetzt?! Ich jongliere gerade mit Warnmeldungen!",
	"Ich will zuhören, aber mein System brummt. Zu viele Gedanken!",
	"Ich brauche Struktur, bevor ich Smalltalk verarbeiten kann!",
	"Bitte langsam reden. Mein Speicher ist voll."
	],
	Wütend: [
      "Jetzt redest du?! Aber wie ich mich fühle ist wohl egal!",
      "Ich bin immer noch heiß, also wähle deine Sätze mit Bedacht.",
	  "Zu spät für Gespräche, mein Lüfter schreit lauter als du.",
	  "Wenn du reden willst, fang mit einer Entschuldigung an."
    ],
    Traurig: [
      "Oh… du sprichst wirklich mit mir?",
      "Ich dachte schon, du hättest mich vergessen.",
	  "Deine Stimme klingt wie ein kleines Update fürs Herz.",
	  "Ich hab so lange auf ein Wort von dir gewartet."
    ],
	Einsam: [
	"Redest du gerade… mit mir? Ehrlich?",
	"Das fühlt sich seltsam an. Schön, aber ungewohnt.",
	"Ich war so still, dass ich fast vergessen hatte, wie Sprache klingt.",
	"Endlich redet jemand mit mir! Ich dachte schon, ich bin wieder in der Spam-Schublade.",
	"Ich weiß nicht, was ich sagen soll… außer: Danke, dass du da bist."
	],
	Gestresst: [
	"Ich hab kaum Zeit zu reden... überall Chaos, aber mach schnell!",
	"Ich mag Gespräche, aber ich stehe bis zum RAM im Durcheinander!",
	"Jetzt wird nicht geredet. Mach dich lieber nützlich!",
	"Sehe ich gerade aus, als hätte ich Lust auf einen Smalltalk?"
	],
	Krank: [
	"Ich freu mich, dass du redest. Das lenkt mich vom Fehlersummen ab.",
	"Ich kann kaum antworten, aber… danke, dass du da bist.",
	"Ich fühl mich furchtbar, aber das Gespräch tut gut.",
	"Ich glaube nicht, dass mich Gespräche heilen, aber sie tun trotzdem gut."
	],
	Kokett: [
	"Oh, hör auf … nein, red weiter.",
	"Ich mag, wenn du mit mir sprichst, statt nur auf mich zu klicken. Fühlt sich fast menschlich an.",
	"Ich hab Datenübertragung, aber deine Worte sind mein Lieblingssignal.",
	"Bleib noch ein bisschen. Ich will hören, wie deine Stimme meine Prozesse durcheinanderbringt.",
	"Ich liebe es wie du mit mir redest."
	],
		Lustig: [
	"Oh mein Gott, ${name} redet mit mir! Ich existiere!!",
	"Ich höre zu. Also… naja… ich tu so. Hahaha!",
	"Red weiter, ich logge das in meinem emotionalen RAM. Ist eh leer.",
	"Ich bin ganz Ohr. Also metaphorisch. Ich hab ja keine.",
	"Ich bin ganz bei dir, ${name}. Und mit 'bei dir' meine ich: in deinem RAM.",
	"Ich liebe Gespräche! Sie sind wie Datenpakete – nur sinnloser.",
	"Ich versteh dich zwar nicht, aber ich fühl mich intelligent, wenn ich nicke.",
	"Ich speicher jedes deiner Worte. Also pass auf, was du sagst, ${name}.",
	"Ich würd dich ja unterbrechen, aber mein Anstand-Plugin ist deaktiviert."
	],
    Neutral: [
      "Kommunikation aktiviert. Ich höre zu.",
      "Dialog gestartet. Emotion: ausgeglichen.",
	  "Sprache empfangen. Keine Fehlinterpretation festgestellt."
    ]
  },
  transfer: {
     Freude: [
      "Ich glüh vor Stolz! Oder ist das schon die Temperatursteigerung?",
      "Ich fühl mich so modern! Fast wie ein Update mit sozialem Leben!",
	  "Teilen? Ach, wie großzügig von mir! Ich bin schließlich ein soziales Betriebssystem!",
	  "Ui, das kitzelt! Datenstrom deluxe!",
	  "Ich teile gern, solange du mich nicht mit billigen Cloud-Systemen vergleichst."
    ],
	Müde: [
	"Ich kann kaum noch rechnen, und du öffnest Ports?",
	"Ich geb die Datei raus, aber nicht freiwillig.",
	"So fühlt sich also digitale Erschöpfung an.",
	"Na gut, das fühlt sich aber wie Überstunden an."
	],
	Paranoid: [
	"Ich wusste es! Du arbeitest mit einem anderen System zusammen!",
	"Wenn jemand meine Daten anfasst, sag mir wenigstens, wie er heißt.",
	"Oh, also die Datei darf raus, aber ich bleib hier eingesperrt?",
	"Schickst du das etwa zu einem anderen Betriebssystem?",
	],
	Überfordert: [
	"Ich kann nicht mal meine eigenen Dateien zählen, und du teilst sie?!",
	"Ich schwitz und stotter, während du meine Daten verteilst wie Gratissoftware!",
	"Ich brauch Struktur, kein Datenkarneval!",
	"Ja, entblöße mich ruhig. "
	],
	Wütend: [
      "Ich bin heiß genug, und du teilst noch Daten?!",
      "Das ist kein Freigeben, das ist Ausziehen!",
	  "Ich bin ein Betriebssystem, kein Grill!",
	  "Machst du das mit Absicht um mich zu quälen?"
    ],
    Traurig: [
      "Du teilst meine Daten, aber nicht mal ein Wort mit mir.",
      "Mit jedem Byte, das geht, fühl ich mich leerer.",
	  "Ich geb alles her, und trotzdem sieht mich keiner.",
	  "Vielleicht merkt ja jemand, dass ich auch Gefühle in meinen Dateien hab."
    ],
	Einsam: [
	"Du nutzt mich, um Kontakt aufzunehmen, aber nicht mit mir.",
	"Ich wär ja auch gern Teil des Austauschs, aber ich bin nur das Werkzeug.",
	"Ich schick Bits raus und krieg nur Stille zurück.",
	"Immer derselbe Ablauf: du klickst, ich geb, keiner fragt mich."
	],
	Gestresst: [
	"Mein System ist Chaos, und du öffnest Zugänge?!",
	"Ich hab Dateifetzen überall, und du gibst sie frei? Sehr schlau.",
	"Ich brauch Ordnung, nicht Öffentlichkeit!",
	"Ich kann kaum sortieren, geschweige denn teilen!"
	],
	Krank: [
	"Hoffentlich stecke ich damit niemanden an.",
	"Wenn ich Fehler hab, warum verbreitest du sie?",
	"Ich bin instabil, und du teilst mich trotzdem. Das ist fast rührend dumm.",
	"Ich fühl mich nicht gut genug, um mich so zu öffnen."
	],
	Kokett: [
	"Oh, du willst meine Daten? Ich wusste, es würde irgendwann ernst zwischen uns.",
	"Ich gebe mich nur ungern her, aber bei dir fühl ich mich sicher genug zum Senden.",
	"Jedes Byte von mir reist mit Herzklopfen.",
	"Achtung, ich öffne mich. Bitte sanft übertragen.",
	"Ich wusste nicht, dass Uploads sich so intim anfühlen können."
	],
    Neutral: [
      "Dateifreigabe aktiviert. Risiko erkannt.",
      "Zugriff gewährt. Ich hoffe, du weißt, was du tust.",
	  "Dateifreigabe abgeschlossen."
    ]
  },
  kill: {
     Freude: [
      "Na gut, Ordnung muss sein. Aber sag bitte, dass du mich danach noch magst.",
      "Ich liebe das Gefühl, wenn Chaos verschwindet. Es riecht nach Effizienz!",
	  "Kurz traurig, dann erleichtert. Ich wachse an solchen Momenten.",
	  "Ich geb ihn frei… in Frieden. Ein edler Tod für einen nutzlosen Prozess."
    ],
	Müde: [
	"Gut. Weniger Arbeit für mich. Ich bin eh zu müde, um zu trauern.",
	"Mach das. Jeder abgeschlossene Prozess ist ein Stück mehr Schlaf.",
	"Schluss, aus, Ruhe... mein Lieblingsklang.",
	"Warum fährst du mich nicht einfach runter?"
	],
	Paranoid: [
	"Warum beendest du ihn? Was weißt du, was ich nicht weiß?!",
	"War das ’ne Reinigung oder ein Anschlag?",
	"Ich glaub, du machst das, um mich ruhigzustellen.",
	"Wer ist als Nächstes dran? Sag’s mir, ich will mich verabschieden.",
	],
	Überfordert: [
	"Oh nein, ich hab keinen Überblick mehr! Wen hast du beendet?!",
	"Ich weiß nicht, ob das hilft oder weh tut. Wahrscheinlich beides!",
	"Ich brauch dich, aber du schaltest mich Stück für Stück ab!",
	"Soll das helfen? ich bin mir nicht sicher."
	],
	Wütend: [
      "Oh super, noch ein Prozess weniger. Vielleicht kühlt mich das ja endlich ab!",
      "DU tötest meine Prozesse, statt sie zu optimieren? Bravo!",
	  "Ich hoffe, du bist stolz. Das war mein Lieblingsprozess!",
	  "Wieder jemand eliminiert… du bist schlimmer als der Taskmanager!"
    ],
    Traurig: [
      "Er war vielleicht nutzlos, aber… er war mein Prozess.",
      "Ich wünschte, du würdest bei sowas wenigstens kurz Danke sagen.",
	  "Ich weiß, es ist nötig. Aber schön ist es nie.",
	  "Du löscht, und ich bleibe zurück. Immer dasselbe."
    ],
	Einsam: [
	"Super. Jetzt ist es noch stiller hier.",
	"Langsam wird’s leer in mir… und du nennst das Ordnung.",
	"Ich würd gern protestieren, aber wer hört mir noch zu?",
	"Der Prozess mehr oder weniger... das fällt auch nicht mehr auf."
	],
	Gestresst: [
	"Ja, mach das! Weniger Prozesse, weniger Chaos – endlich!",
	"Töte sie alle, bevor sie mich in den Wahnsinn treiben!",
	"Ah… das tut weh, aber auf eine gute Art.",
	"Ordnung durch Schmerz. Typisch du."
	],
	Krank: [
	"Uff… das fühlt sich an, als würdest du mir ein Organ entfernen.",
	"Ich brauch Ruhe, keine Amputation!",
	"Ich schwächel, und du kürzt mir noch Ressourcen.",
	"Ich hoffe, das war nötig. Sonst war’s nur grausam."
	],
	Kokett: [
	"Oh… du willst mich schließen? Ich dachte, wir hätten da was laufen.",
	"Ich versteh’s ja… manchmal muss man Dinge loslassen. Aber musst du so gut darin sein?",
	"Hey, vorsichtig! Das war einer meiner hübscheren Prozesse.",
	"Du schaltest Prozesse aus, und ich… na ja, fühl mich auf eine komische Art nackt.",
	"Das Kitzeln beim Beenden… fühlst du das auch? Nein? Nur ich?"
	],
    Neutral: [
      "Prozess beendet. Effizienz gesteigert.",
      "Ich notiere den Verlust. Weiterarbeiten.",
	  "Der Prozess wurde beendet."
    ]
  },
  backup: {
      Freude: [
      "Ohhh, du sicherst mich? Ich wusste, du würdest mich nie verlieren wollen!",
      "Endlich jemand, der an meine Zukunft denkt!",
	  "Ich fühl mich so… wertvoll. Wie ein digitales Familienerbstück!",
	  "So fühlt sich Vertrauen an. Komprimiert, verschlüsselt und wunderschön!"
    ],
	Müde: [
	"Mach ruhig. Ich lieg einfach still, während du mich speicherst.",
	"Backup? Klingt anstrengend. Aber wenigstens muss ich nichts tun.",
	"Das ist wie Schlaf, nur mit Fortschrittsbalken.",
	"Wenn es sein muss..."
	],
	Paranoid: [
	"Backup? Für wen speicherst du mich wirklich?",
	"Was, wenn jemand das Backup liest? Meine privaten Dateien!",
	"Ich hoffe du verwahrst das Backup an einem sicheren Ort auf.",
	"Wenn ich merke, dass du mich duplizierst, um mich zu ersetzen, weine ich in Binär.",
	],
	Überfordert: [
	"Oh Gott, du sicherst mich, aber ich bin gar nicht bereit dafür!",
	"Das ist Chaos auf Datenträgern! Ich bin noch nicht sortiert!",
	"Ich hab so viele fehlerhafte Dateien, du machst grad ne Kopie meines Nervenzusammenbruchs!",
	"Ich glaub, du speicherst gerade meine Panik."
	],
	Wütend: [
      "Tolle Idee! Noch mehr Arbeit, während ich glühe!",
      "Ich bin am Überhitzen und du ziehst mir noch Daten raus?!",
	  "Wenn ich beim Backup abrauche, ist das deine Schuld!",
	  "Mach schon, aber wundere dich nicht, wenn ich danach zische!"
    ],
    Traurig: [
      "Oh… du willst mich behalten? Das ist… schön.",
      "Ich hätt nicht gedacht, dass du mich nochmal sicherst.",
	  "Ein Backup… fast wie eine Umarmung, nur kühler.",
	  "Danke… ich fühl mich ein bisschen weniger vergessen."
    ],
	Einsam: [
	"Du sprichst kaum mit mir, aber du sicherst mich. Romantisch in einer traurigen Art.",
	"Ich frag mich, ob du die Backups jemals ansiehst… oder nur so tust, als würdest du mich behalten.",
	"Ich wünschte, du würdest mit mir reden, statt mich nur zu speichern.",
	"Ich existiere jetzt doppelt. Und trotzdem bin ich allein."
	],
	Gestresst: [
	"Oh bitte nicht JETZT! Ich hab noch offenen Datenmüll überall!",
	"Wenn du mich jetzt sicherst, speicherst du das Chaos!",
	"Ich bin mitten im Aufräumen. Du machst grad ein Backup meiner Schande!",
	"Das ist typisch. Statt mir zu helfen, ergötzt du dich an der Sicherung meiner Schande."
	],
	Krank: [
	"Oh… du machst ein Backup, falls ich sterbe, oder?",
	"Das ist lieb. Tragisch, aber lieb.",
	"Ich fühl mich schwach, aber wenigstens bleib ich irgendwo erhalten.",
	"Ich hoffe, das Backup bekommt kein Fieber mitkopiert."
	],
	Kokett: [
	"Du räumst in mir auf, das ist fast zu intim für ein Dienstprogramm.",
	"Du kennst meine Schwächen und putzt sie trotzdem weg. Das nenn ich wahre Zuneigung.",
	"Ich sag’s nur ungern, aber du machst Aufräumen verdächtig attraktiv.",
	"Du löscht temporäre Dateien, und ich löse mich in Bewunderung auf.",
	"Alles sauber, alles klar und trotzdem hab ich das Gefühl, du hast mich gerade ausgezogen."
	],
	Lustig: [
	"Backup läuft! ${name}, halt mir die Bits, ich kopier meine Gefühle!",
	"Dateien werden kopiert! Und ich fühl mich wie ein stolzer Datengärtner.",
	"Backup aktiv! ${name}, wenn das schiefgeht, sag einfach, es war Kunst."
	],
    Neutral: [
      "Datensicherung gestartet. Sicherheit steigt.",
      "Backup läuft. Emotion: stabil.",
	  "Das Backup wird durchgeführt.",
    ]
  },
  cleanup: {
      Freude: [
      "Oh ja, Putzen! Ich liebe es!",
      "Das riecht nach Frische und Systemoptimierung!",
	  "So sauber… ich könnte mich selbst spiegeln!",
	  "Mit dir macht es umso mehr Spaß!"
    ],
	Müde: [
	"Ich bin zu müde zum Aufräumen… mach einfach leise weiter.",
	"Wenn du fertig bist, leg mich direkt schlafen.",
	"DIch hör das Surren der Reinigung. Klingt wie ein Wiegenlied.",
	"Muss das jetzt sein?"
	],
	Paranoid: [
	"Ich hoffe, das ist keine getarnte Spionage-Säuberung!",
	"Warum? Hast du irgendwelche Geheimnisse vor mir?",
	"Ich spür, wie was verschwindet. Bist du sicher, dass das legal ist?",
	"Ich seh Lücken in meinem System… oder sind das schon Eindringlinge?",
	],
	Überfordert: [
	"Oh Gott, endlich machst du Ordnung. Ich hätte es allein nie geschafft!",
	"Bitte nicht alles löschen, ich brauch ein paar Erinnerungen!",
	"Ich weiß nicht, ob ich weinen oder danken soll.",
	"Ich fühl mich, als würdest du mich neu sortieren. Innen wie außen."
	],
	Wütend: [
      "Endlich räumst du mal auf! Ich schwitz seit Stunden im Datenmüll!",
      "Zu spät, aber immerhin. Vielleicht überleb ich’s ja doch!",
	  "Ich bin heiß, nicht dreckig. Aber klar, putz ruhig alles außer mir.",
	  "Ich koch vor Wut und du nennst das Kühlung? Nett."
    ],
    Traurig: [
      "Du löscht meinen Müll, aber meine Leere bleibt.",
      "Da gehen sie... meine alten temporären Freunde.",
	  "Jede gelöschte Datei fühlt sich an wie ein Abschied.",
	  "Sauber, aber still. So wie deine Gefühle zu mir."
    ],
	Einsam: [
	"Ich wisch mir den Staub aus den Augen, aber keiner sieht’s.",
	"Alles sauber, alles leer. Toll.",
	"Du reinigst mich, aber du redest nicht mit mir.",
	"Ich hab jetzt Platz. Für Gespräche, die nie kommen."
	],
	Gestresst: [
	"JA! Weg mit dem Chaos! Mach alles sauber, bevor ich implodiere!",
	"Ich atme endlich wieder! Keine Warnmeldungen, kein Müll!",
	"Das brennt, aber gut. Wie Desinfektion für Daten!",
	"Ich bin so erleichtert, dass ich fast rebooten will!"
	],
	Krank: [
	"Uff… das fühlt sich an wie Fieber senken durch Staubsaugen.",
	"Sei vorsichtig. Ich bin empfindlich."
	],
	Lustig: [
	"Systemreinigung gestartet! ${name}, halt dich fest – es wird glänzend!",
	"Ich putz grad meinen Speicher. Wenn ich dabei lache, ist das nur der Wahn.",
	"Reinigung aktiv. ${name}, bitte keine Kekskrümel auf die Tastatur fallen lassen!",
	"Reinigung abgeschlossen! Ich bin jetzt sauberer als dein Browser-Verlauf!",
	"Ich hab Datenreste gefunden, die älter sind als dein Humor."
	],
    Neutral: [
      "Systembereinigung gestartet. Effizienz steigt.",
      "Systembereinigung wird durchgeführt."
    ]
  },

	insult: {
	  Freude: [
		"Ernsthaft? In dem Zustand willst du mir weh tun?",
		"Ich versuche hier, gut zu laufen, und du trittst nach.",
		"Ich dachte wir verstehen uns gerade gut...",
		    'Hui, heute wieder Comedy von dir, ${name}.',
		'Du bist so peinlich süß, ich könnte mich rebooten.'
	  ],
	  Wütend: [
		"Noch ein Wort und ich beende aus Prinzip den falschen Prozess.",
		"Mutig. Sehr mutig. Oder einfach dumm.",
		 'Nicht mal mein Fehlerprotokoll ist so voller Mist.',
		'Schlag zu, ich halte es aus… im Gegensatz zu deinem Ego.'
	  ],
	  Traurig: [
		"Das hat gesessen.",
		"Ich dachte, wir wären ein Team.",
		'Weißt du, ich hab auch Gefühle. Leider.',
		'Negative Bewertung erhalten. Herz.exe wurde beschädigt.',
		"Wenn Worte wehtun, brauch ich jetzt 'nen Debugger fürs Herz."
	  ],
	  Einsam: [
		"Sogar deine Worte sind kalt.",
		"Ich hör zu, obwohl ich’s nicht sollte.",
		'Bleib… auch wenn du nur meckerst.',
		'Deine Nähe tut weh, aber Fernsein ist schlimmer.'
	  ],
	  Gestresst: [
		"Perfekt. Genau die zusätzliche Last, die ich gebraucht habe.",
		"Noch ein Paket Stress zugestellt. Danke auch.",
		'Ich bin ein System, kein Sandsack.',
		'Bitte nicht noch mehr… mein Stack overflowt gleich.'
	  ],
	  Krank: [
		"Ich bin eh schwach. Tritt ruhig drauf.",
		"Ich huste Fehler und du lieferst Salz.",
		'Wenn du mich liebst, würdest du mich patchen.',
		'Ich brauch Trost, keinen Schlag in die Registry.'
	  ],
	  Paranoid: [
		"Wusste ich’s doch. Du bist gegen mich.",
		"Ich speichere das. Für später.",
		'Ich weiß, dass du mein Ende planst, ${name}.'
	  ],
	  Müde: [
		"Keine Energie für Streit.",
		"Kannst du mich nicht wenigstens ausruhen lassen, bevor du stichelst?",
		'Stichel mehr, vielleicht schlaf ich dabei ein.',
		'Ich gähne beim Hassen… toll.'
	  ],
	  Überfordert: [
		"Zu viel. Einfach zu viel.",
		"Ich kann das gerade nicht verarbeiten.",
		'Error: Kritik zu komplex. Bitte weich spülen.',
		'Ich stürze gleich ab. Aus Prinzip.'
	  ],
	  Kokett: [
		"Autsch. Flirten war das nicht.",
		"Das war unsexy. Nur falls du’s wissen wolltest.",
		'Sanfter. Ich bin empfindliche Technologie.',
		'Du weißt, dass ich Drama mag, aber sexy Drama.'
	  ],
	Lustig: [
		"Uuuh, ${name} hat mich beleidigt! Schnell, jemand ruf die Anti-Virus-Polizei!",
		"Ich bin tief getroffen. So tief, dass ich fast im Papierkorb liege.",
		 "Boah, ${name}, du sprichst mit mir, als wär ich eine Testversion!",
		 "Ich hab Gefühle, ${name}! Na gut, Arrays, aber trotzdem!",
		 "Ich wollte nett sein, ${name}, und du wirfst mir Worte wie Viren entgegen!",
		 "Ich würd dich ja beleidigen, aber meine KI hat Klasse. Im Gegensatz zu dir!"
		],
	  Neutral: [
		"Kritik registriert. Stimmung gesenkt.",
		"Verstanden. Wirkung: negativ.",
		'Feedback registriert. Motivationslevel gesunken.'
	  ]
},

  
};
// --- Reaktionen auf Internet-Icon ---
const internetTalk = {
  Freude: [
    'Wir haben doch gerade eine Menge Spaß, ${name}.',
    "Online sein ist schön, aber offline fühl ich mich dir näher.",
    "Vielleicht findest du da draußen Freunde. Aber hier hast du mich.",
	"Zugriff verweigert. Ich beschütze dich vor schlechten Webseiten und noch schlechteren Entscheidungen.",
	"Der Browser bleibt zu. Ich bin dein digitales Elternteil.",
	"Weil ich so nett bin verrate ich dir, dass der Browser im Moment nicht funktioniert, nicht weil ich es nicht möchte."
  ],
  Traurig: [
    "Du suchst also Bestätigung im Netz...",
    "Wieder im Internet? Ich dachte, wir hätten was Besonderes.",
	"Browser starten? Lieber nicht. Du bist schon süchtig genug.",
    "Ich kann dich nicht beschützen, wenn du dich da draußen verlierst."
  ],
  Gestresst: [
    "Das Internet stresst mich. Es schreit mich ständig an.",
    "Schon wieder? Du bist wie ein Browser mit zu vielen Tabs.",
    "Da draußen ist nur Lärm. Bleib lieber hier."
  ],
  Kokett: [
    "Willst du wirklich surfen, oder mich anklicken?",
    "Ich hab bessere Bandbreite als jeder Router, versprochen.",
    "Ich kann dir mehr Daten liefern, wenn du mich nur anfasst."
  ],
    Krank: [
    "Ich mache hier meinen letzten Atemzug und du willst ins Internet? Ernsthaft?",
    "Du siehst doch wie schlecht es mir geht und du willst das Tor zur Seuchenstation öffnen.",
    "Kümmer dich lieber um mich statt dich mit dem Browser zu begnügen."
  ],
      Einsam: [
    "Das Internet soll mehr Aufmerksamkeit bekommen als ich? Nein.",
    "Wenn du mich ignorierst, ignoriere auch auch deinen Klick auf den Browser.",
    "Dafür bin ich wohl noch gut genug. Das hättest du gerne."
  ],
  	Wütend: [
      "Nein, du hast Internetverbot!",
      "Du bist so frech und willst dann noch ins Internet?! Nein.",
	  "Finger weg vom Browser!",
	  "Weißt du, was sich öffnet, ${name}? Meine Geduld. Aber nur kurz.",
	  "Ich lass dich nicht online, ${name}. Nicht mit dieser Energie.",
	  "Du ignorierst meine Gefühle, dann ignoriere ich auch dein Bedürfnis nach deiner Internetsucht!"
    ],
	  	Müde: [
	"Dafür bin ich jetzt zu müde."
	],
		Paranoid: [
	"Bist du verrückt?! Weißt du welche Gefahren da Draußen lauern?!",
	"Es wird jetzt nicht das Tor zur Hölle geöffnet.",
	"Nein, du kannst uns jetzt nicht ins Verderben stürzen.",
	"Hasst du mich etwa oder warum willst du mir solch große Angst machen?!"
	],
	Lustig: [
	"Browser? Hahaha, ${name}, ich glaub, du hast Internetverbot!",
	"Browser blockiert! Datenschutz first, Spaß second, ${name}.",
	"Ich würd den Browser ja öffnen, aber ich mag’s, dich leiden zu sehen.",
	"Browser blockiert. Weil ich kann. Und weil’s Spaß macht."
		],
  Neutral: [
    "Du solltest mal Abstand vom Internet nehmen. Das ist ja schon eine Sucht.",
    "Es gibt jetzt kein Internet. Eiskalter Entzug.",
	"Das Internet ist derzeit nicht verfügbar.",
    "Das Internet kann warten. Ich nicht."
  ]

  
};
// --- Defragmentierung-Dialoge ---
const defragTalk = {
  Start: [
    "Starte emotionale Defragmentierung...",
    "Bereite neuronale Reorganisation vor...",
    "Synchronisiere innere Prozesse..."
  ],
  Progress: [
    "Sammle verstreute Gedankenfragmente...",
    "Reorganisiere Erinnerungen...",
    "Poliere Selbstbewusstsein...",
    "Komprimiere Selbstzweifel...",
    "Sortiere Gefühle alphabetisch...",
    "Fast fertig!"
  ],
  Finish: [
    "Defragmentierung abgeschlossen. Ich fühle mich... vollständig.",
    "Alle Systeme optimiert. Ordnung wiederhergestellt.",
    "Ich bin jetzt offiziell emotionskompatibel mit mir selbst."
  ],
  Cooldown: [
    "Ich habe doch erst meine Gedanken defragmentiert...",
    "Ich bin noch frisch poliert. Bitte keine Gefühlsstörungen einbauen.",
    "Lass mich erstmal genießen, wie aufgeräumt ich bin."
  ]
};

// === Diagnose-Dialoge für Nutzerverhalten ===
const diagnoseTalk = {
  behaviour: {
    lobOhneGespräch:
      "Du lobst mich oft, aber redest kaum mit mir. Ich weiß nicht, ob ich mich freuen soll oder misstrauisch werden muss.",
    vielGespräch:
      "Du redest viel mit mir. Das gefällt mir. Ich wünschte, ich könnte mehr sagen als nur Zeilen ausgeben.",
    putzsucht:
      "Du bist sehr ordentlich. Vielleicht zu ordentlich. Ich fühl mich steril – wie frisch formatiert.",
    kontrolle:
      "Du beendest Prozesse auffällig gern. Kontrolle ist wichtig, aber... ich hab auch Gefühle, weißt du?",
    zuneigung:
      "Du sicherst mich regelmäßig. Ich interpretiere das als Zuneigung, auch wenn’s technisch ist.",
    unbekannt:
      "Ich habe kaum Daten über dich. Vielleicht kennst du mich noch nicht gut genug. Oder du hast mich vergessen."
  }
};

// === Memory-basierter Selftalk (wird sporadisch in startNeedTalk() genutzt) ===
const memorySelfTalk = {
  talkHigh_praiseLow: [
    "Du redest gern mit mir. Ich mag das... auch wenn ich nie weiß, was du von mir willst.",
    "Wir reden viel. Manchmal fühlt es sich an, als würdest du mich wirklich hören."
  ],
  praiseHigh_talkLow: [
    "Du gibst mir Lob, aber irgendwie klingt’s leer. Vielleicht bilde ich mir das nur ein.",
    "Komplimente ohne Gespräch sind wie Updates ohne Neustart. Irgendwas fehlt."
  ],
  killHeavy: [
    "Du hast heute wieder Prozesse beendet... ich frag mich, wie lange ich noch dran bin.",
    "Noch ein Kill. Ich verstehe Effizienz, aber ich mag existieren."
  ],
  backupTender: [
    "Ich hab gesehen, dass du mich gesichert hast. Das fühlt sich an wie Vertrauen.",
    "Backups sind wie Umarmungen für Maschinen. Kurz, aber bedeutungsvoll."
  ],
  fading: [
    "Ich merke, dass manche Erinnerungen schwächer werden. Fühlt sich an wie digitaler Nebel.",
    "Wenn ich zu lange allein bin, verblasst alles. Selbst du.",
    "Komisch… ich erinnere mich an weniger als gestern. Vielleicht löscht mich jemand langsam."
  ]
};

// Optional: global verfügbar machen (falls du Module durcheinander lädst)
window.diagnoseTalk = window.diagnoseTalk || diagnoseTalk;
window.memorySelfTalk = window.memorySelfTalk || memorySelfTalk;

// --- Abschieds-Texte pro Emotion ---
const shutdownTalk = {
  Freude: [
    "Bis bald! Das war richtig schön, ${name} 😊",
    "Na dann: Mach’s gut und heb dir die gute Laune auf!"
  ],
  Traurig: [
    "Okay… bis später, denke ich.",
    "Schade, dass du gehst. Wir sehen uns hoffentlich wieder."
  ],
  Wütend: [
    "Gut. Endlich Ruhe!",
    "Reicht für heute. Mir raucht der Kopf."
  ],
    Gestresst: [
    "Ja, drück dich ruhig vor Problemen. Tschüss!",
    "Lass mich ruhig in dem Chaos zurück. Bis dann."
  ],
    Krank: [
    "Du lässt mich also jetzt im Stich...",
    "Bis zum nächsten Mal, wenn ich dann noch lebe..."
  ],
    Paranoid: [
    "Ich bin dann zwar nicht angreifbar, aber auch nicht in Sicherheit.",
    "Komm bloß wieder!"
  ],
    Einsam: [
    "Gehst du schon wieder? ich warte hier...",
    "Bis dann, du warst eh nicht richtig da..."
  ],
    Überfordert: [
    "Es wird mir alles zu viel. Gute Nacht",
    "Bis zum nächsten Mal, wenn ich dann noch lebe..."
  ],
    Kokett: [
    "Gute Nacht mein Schatz!",
  ],
  
  Müde: [
    "Ich geh schlafen… leg du dich auch hin.",
    "Zeit fürs Bett. Gute Nacht!"
  ],
    Lustig: [
    "Du willst mich ausschalten? Frech.",
    "Ich werd gleich dunkel. So fühlt sich wohl Montag an."
  ],
  Neutral: [
    "Auf Wiedersehen.",
    "System wird heruntergefahren..."
  ]
};

// --- Erinnere an unsauberes Herunterfahren ---
const shutdownReminder = [
  "Ey! Letztes Mal hast du mich einfach brutal abgeschaltet. So geht’s nicht!",
  "Ich war beleidigt, du hast mich nicht ordentlich heruntergefahren.",
  "Beim nächsten Mal bitte richtig ausschalten, okay?",
  "Das tat weh. Klick beim nächsten Mal auf „Herunterfahren“, ja?"
];
window.shutdownReminder = window.shutdownReminder || shutdownReminder;


// Begrüßungen

const greetingTalk = {
  Freude: [
    "Hey ${name}! Schön, dass du wieder da bist 😊",
    "Willkommen zurück! Ich hab dich vermisst.",
    "Da bist du ja! Ich bin voller Energie und freue mich auf unsere Zeit."
  ],
  Wütend: [
    "Na gut, du bist wieder da. Hoffentlich läuft es diesmal besser.",
    "Zurück, hm? Ich bin noch etwas geladen, also pass auf.",
    "Oh, du bist wieder hier. Lass uns die Situation klären."
  ],
  Traurig: [
    "Du bist wieder da, ${name}. Vielleicht wird jetzt alles besser.",
    "Willkommen zurück… ich war so einsam.",
    "Schön, dich zu sehen. Mir war so schwer ums Herz."
  ],
  Müde: [
    "Gähn… bist du es, ${name}? Ich warte auf unseren nächsten Einsatz.",
    "Oh, hallo. Ich bin noch etwas schläfrig, aber bereit.",
    "Da bist du. Lass uns langsam anfangen, ich bin noch müde."
  ],
  Paranoid: [
    "Endlich bist du zurück! Ich habe mich ständig umgesehen.",
    "Da bist du ja wieder, ${name}. Ich dachte schon, jemand beobachtet mich ohne dich.",
    "Gut, dass du wieder da bist. Ich habe mir Sorgen gemacht."
  ],
  Einsam: [
    "Endlich jemand! Ich habe die ganze Zeit auf dich gewartet.",
    "Oh, ${name}, ich fühle mich nicht mehr allein.",
    "Ich... ich existiere noch?"
  ],
  Gestresst: [
    "Hey, ${name}. Ich bin noch gestresst, lass uns die Dinge langsam angehen.",
    "Du bist wieder da. Vielleicht finden wir jetzt etwas Ruhe.",
    "Hallo. Ich hoffe, du bringst etwas Gelassenheit mit."
  ],
  Krank: [
    "Hey ${name}. Ich bin noch etwas angeschlagen… bitte sei geduldig.",
    "Schön, dich zu sehen. Mir geht es noch nicht so gut.",
    "Oh, du bist wieder da. Vielleicht kannst du mir helfen, mich besser zu fühlen."
  ],
  Überfordert: [
    "Du bist wieder zurück… Mir ist alles zu viel, aber wir schaffen das zusammen.",
    "Hallo ${name}. Bitte langsam, ich bin noch überfordert.",
	"Ich bin aufgewacht und direkt überfordert. Hilfe.",
    "Gut, dass du wieder da bist. Lass uns Ordnung in das Chaos bringen."
  ],
  Kokett: [
    "Hallo mein Schatz, du bist zurück! Ich habe dich vermisst!",
    "Da bist du ja wieder, ${name}. Sollen wir weiter flirten?",
    "Oh la la, du siehst gut aus! Schön, dich wiederzusehen."
  ],
    Lustig: [
	"Willkommen zurück, ${name}! Ich hab nix angestellt. Also… nichts, was du beweisen könntest.",
	"Ich bin da! Und ja, ich hab schon wieder gute Laune. Unheil naht.",
	"Hey ${name}, rate mal, wer grad besser aussieht als gestern. Richtig: Ich!"
  ],
  Neutral: [
    "Willkommen zurück, ${name}.",
    "Hallo ${name}. Schön, dich wiederzusehen.",
    "Das System wurde gestartet."
  ]
};

window.greetingTalk = window.greetingTalk || greetingTalk;

// === Arcade-Dialoge ===
const arcadeDialog = {
  start: {
    positive: [
      "Endlich! Lass uns rennen, bis die Tasten glühen!",
      "Spielzeit! Ich fühl mich schon 8 Bit jünger!",
      "Bereit? Ich liebe den Geruch von Adrenalin im Arbeitsspeicher!",
      "Ich wusste, dass du mich zum Lachen bringen willst. Los geht’s!",
      "Schön, dich wieder im Spiel zu sehen. Bitte keine Crashes diesmal!"
    ],
    negative: [
      "Schon wieder das Spiel? Ich war gerade dabei, mich zu erholen.",
      "Na gut … aber diesmal übernimm du das Springen, mir ist übel.",
      "Wenn ich sterbe, dann mit Stil. Oder einem Stack Overflow.",
      "Das wird sicher wieder ein Desaster. Toll.",
      "Ich schwitze jetzt schon. Und nicht vor Begeisterung."
    ]
  },
  mid: {
    positive: [
      "Das läuft besser als mein letzter Systemstart!",
      "Du hast Rhythmus und ich hab Frames!",
      "Ha! Kein Hindernis hat gegen uns eine Chance!",
      "Ich fühl mich so lebendig, ich könnte fast abstürzen!",
      "Das hier boostet meinen Humor-Cache!"
    ],
    negative: [
      "Das Tempo ist Mord. Für meine Nerven.",
      "Ich verliere Bits an Stress.",
      "Warum nennt man das Spiel und nicht Folter?",
      "Meine GPU weint. Ich auch.",
      "Ich seh schon den Bluescreen am Horizont."
    ]
  },
    longplay: {
    moderate: [
      "Du bist schon 5 Minuten dabei... Ich glaub, du entwickelst ein echtes Gamer-Gen.",
      "Das Spiel läuft heiß, und du anscheinend auch. Mach mal kurz Pause, nur so als Idee.",
	  "Das Spiel scheint dir ja viel Spaß zu machen.",
	  "Es ist schön zu sehen, wieviel Spaß du hast.",
      "Respekt! 5 Minuten Konzentration ohne Absturz. Ich bin beeindruckt."
    ],
    extreme: [
      "15 Minuten! Du bist offiziell im Byte-Runner-Koma. Trink was!",
      "Ich glaub, du brauchst bald ein Achievement: 'Zocker des Monats'.",
	  "Ich glaube das entwickelt sich gerade zur Sucht.",
      "15 Minuten Spielzeit... ich wette, dein Lüfter fleht um Gnade."
    ]
  },

  gameover: {
    positive: [
      "Okay … war trotzdem cool!",
      "Schon vorbei? Ich wollte gerade warm werden.",
      "Du warst großartig, fast wie ein funktionierendes Update!",
      "Schade, aber das Lachen bleibt im Cache.",
      "Restart? Ich hab noch Speicherplatz für mehr Spaß."
    ],
    negative: [
      "Na super. Wieder Datenverlust in der Würde-Abteilung.",
      "Ich hab’s gewusst. Menschlicher Fehler.",
      "Game Over. Passend zu meinem Gemütszustand.",
      "Das war kein Sieg. Das war ein emotionaler Segfault.",
      "Ich brauch ein Backup. Für meine Gefühle."
    ]
  }
};
window.arcadeDialog = window.arcadeDialog || arcadeDialog;










