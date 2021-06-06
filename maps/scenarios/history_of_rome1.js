warn("loading the triggers file");

Trigger.prototype.IntroductionMessage = function(data)
{
	if (this.state != "start")
		return;

	var cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	cmpGUIInterface.PushNotification({
		"players": [1],
		"message": "753 vor Christus auf dem Berg Palatin.",
		translateMessage: false
	});
};

Trigger.prototype.OwnershipChangedAction = function(data)
{
	//warn("The OnOwnershipChanged event happened with the following data:");
	//warn(uneval(data));
	let id = Engine.QueryInterface(data.entity, IID_Identity);
	if (data.to == 1 && data.entity == 6437)
	{
		var cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
		cmpGUIInterface.PushNotification({
			"players": [1],
			"message": "Ihr habt den alten Tempel auf dem Berg Kapitol erobert und ihm dem obersten Gott Jupiter geweiht. In dem Tempel habt ihr einen gewaltigen Schatz gefunden.",
			translateMessage: false
		});

		let cmpPlayer = QueryPlayerIDInterface(1);
		cmpPlayer.AddResource("food",1000);
		cmpPlayer.AddResource("wood",1000);
		cmpPlayer.AddResource("stone",1000);
		cmpPlayer.AddResource("metal",1000);
	}

};



Trigger.prototype.OnPlayerWon = function(data)
{
	//warn("The OnPlayerWon event happened with the following data:");
	//warn(uneval(data));
	if (data.playerId == 1)
	{
		warn("WON");
		var cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
		cmpGUIInterface.PushNotification({
			"players": [1],
			"message": "Alle gegnerischen Staemme wurden von Romulus unterworfen. Romulus wurde der erste Koenig Roms. Der roemische Geschichtsschreiber Titus Livius nennt Numa Pompilius als Nachfolger von Romulus. Um das Jahr 475 v. Chr. wurde Rom eine Republik.",
			translateMessage: false
		});

	}

};



{
var cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);

cmpTrigger.state = "start";
cmpTrigger.DoAfterDelay(10, "IntroductionMessage", {});

let data = { "enabled": true };
cmpTrigger.RegisterTrigger("OnOwnershipChanged", "OwnershipChangedAction", data);
cmpTrigger.RegisterTrigger("OnPlayerWon", "OnPlayerWon", data);

};
