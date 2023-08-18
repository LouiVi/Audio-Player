cfg.Light, cfg.Portrait, cfg.Share, cfg.MUI;

//Demo of a simple media player.
//Note: This example expects some mp3 files to exist
//in the '/sdcard/music' folder

//Called when application is started.
function OnStart()
{   
	//Create layout that fills the screen.
	lay = app.CreateLayout( "Linear", "FillXY,VCenter" )
		
	//Create music list.
	spin = app.CreateSpinner( "[No tracks found]" )
	spin.SetSize( 0.8, -1 )
	spin.SetOnTouch( spn_OnTouch )
	lay.AddChild( spin )
	
	//Create 'Play' button.
	btnPlay = app.CreateButton( "Play", 0.4, 0.1 )
	btnPlay.SetMargins( 0, 0.05, 0, 0 )
	btnPlay.SetOnTouch( btnPlay_OnTouch )
	lay.AddChild( btnPlay ) 
	
	//Create 'Pause' button.
	btnPause = app.CreateButton( "Pause", 0.4, 0.1 )
	btnPause.SetOnTouch( btnPause_OnTouch )
	lay.AddChild( btnPause ) 
	
	//Create 'Stop' button.
	btnStop = app.CreateButton( "Stop", 0.4, 0.1 )
	btnStop.SetOnTouch( btnStop_OnTouch )
	lay.AddChild( btnStop ) 
	
	//Create seek bar and add to layout.
	skb = app.CreateSeekBar( 0.8, -1 )
	skb.SetMargins( 0, 0.05, 0, 0 )
	skb.SetRange( 1.0 )
	skb.SetOnTouch( skb_OnTouch )
	lay.AddChild( skb )
	
	txt = app.CreateText( "", 1, 0.1 );
	lay.AddChild( txt );
	
	
	//Create volume bar and add to layout.
	skbVol = app.CreateSeekBar( 0.8, -1 )
	skbVol.SetMargins( 0, 0.05, 0, 0 )
	skbVol.SetOnTouch( skbVol_OnTouch )
	skbVol.SetRange( 1.0 )
	skbVol.SetValue( 0.5 )
	lay.AddChild( skbVol )
	
	//Add main layout to app.
	app.AddLayout( lay )
	
	//Create media player.
	player = app.CreateMediaPlayer()
	player.SetOnReady( player_OnReady )
	player.SetOnComplete( player_OnComplete )
	
	//Find mp3 files on internal sdcard .
	mp3List = app.ListFolder( "/storage/emulated/0/Download/TeraBox/Download/Music", ".mp3" )
	spin.SetList( mp3List )
	
	//Load the first file found.
	player.SetFile( "/storage/emulated/0/Download/TeraBox/Download/Music/Alexio La Bestia - Te Vas A Morir Tu [Official Audio].mp3" );// + spin.GetText() )
	dur = null;
	
	//Start timer to update seek bar every second.
	setInterval( "Update()", 1000 )
}

//Called when file is ready to play.
function player_OnReady()
{
	//Get file duration.
	dur = player.GetDuration()
	player.SeekTo( 191.438 );
	player.Play();
	app.ShowPopup( "Ready" )
}

//Called when playback has finished.
function player_OnComplete()
{
player_OnReady();
	app.ShowPopup( "Finished" )
}

//Handle file select.
function spn_OnTouch( item )
{
	player.SetFile( "/sdcard/music/" + item )
}

//Handle 'Play' button.
function btnPlay_OnTouch() 
{
	player.Play()
}

//Handle 'Pause' button.
function btnPause_OnTouch() 
{
	player.Pause()
}

//Handle 'Stop' button.
function btnStop_OnTouch() 
{
	player.Stop()
}

//Called when user touches the seek bar.
function skb_OnTouch( value )
{
	player.SeekTo( dur * value )
}

//Update seek bar.
function Update()
{
	prog = player.GetPosition()
	//alert(prog);
	if( dur ) skb.SetValue( prog / dur )
	txt.SetText( convertMS(parseInt(prog*10)).seconds);
	if(prog >= 250.443) player.Stop(), player_OnReady();
}

//Called when user touches volume bar.
function skbVol_OnTouch( value )
{
	player.SetVolume( value, value )
}

function convertMS(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return {hours, minutes, seconds };
  //return hours.toString() + ":" + minutes.toString() + ":" + seconds;
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

app.ShowPopup( seconds );
  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
//console.log(msToTime(300000))

// Example usage
const milliseconds = 234*10;
const time = convertMS(milliseconds);
alert(JSON.stringify(time)); // { hours: 34, minutes: 17, seconds: 36 }