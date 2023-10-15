cfg.Light, cfg.Portrait, cfg.Share, cfg.MUI;
app.LoadPlugin( "GifViewer" );
app.LoadPlugin( "DsNav" );
app.LoadPlugin( "Utils" );
var Uri = new Array();
var  dur1 = 0, repeat = true;

//Create an action bar at the top.
function CreateActionBar()
{

		rColor = "#DC8736"; //utils.RandomHexColor(false);
   //app.SetClipboardText( rColor );
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layHoriz.SetBackGradient( utils.GetGradientColors(rColor)[0], rColor, utils.GetGradientColors(rColor)[1]);
   
    //Create horizontal layout for top bar.
    //layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    //layHoriz.SetBackColor( "#4285F4" );
    lay.AddChild( layHoriz );
    
    //Create menu (hamburger) icon .
    txtMenu = app.CreateText( "[fa-bars]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,10,12,10, "dip" );
    txtMenu.SetTextSize( 27 );
    txtMenu.SetTextColor( "#ffffff" );
    txtMenu.SetOnTouchUp( function(){app.OpenDrawer()} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( "Home", -1,-1, "Left" );
    txtBarTitle.SetMargins(0,10,0,0,"dip");
    txtBarTitle.SetTextSize( 22 );
    txtBarTitle.SetTextColor( "#ffffff" );
    layBarTitle.AddChild( txtBarTitle );
    
    /*    
    //Create search icon.
    txtSearch = app.CreateText( "[fa-search]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 12,2,12,10, "dip" );
    txtSearch.SetTextSize( 24 );
    txtSearch.SetTextColor( "#eeeeee" );
    txtSearch.SetOnTouchUp( function(){app.ShowPopup("Todo!")} );
    layHoriz.AddChild( txtSearch );
    */
}
//Demo of a simple media player.
//Note: This example expects some mp3 files to exist
//in the '/sdcard/music' folder

/* Spinner and on GIF change speed handler*/
function setSpeed ( item ) {
  item = item||speedSpin.GetText();
  var speed;
  switch (item) {
    case 'Slow': speed = .35; break;
    case 'Fast': speed = 4; break;
    default: speed = 1;
  }
  gifView.SetSpeed( speed );
}

function repeatCheck() {
  if ( !repeat ) { gifView.Stop(); gifView.SeekTo(0); }
}

//Called when application is started.
function OnStart()
{   
utils = app.CreateUtils();
video = app.CreateVideoView( 1, 0.654 );
gifFile = 'Misc/music';
	//Create layout that fills the screen.
	lay = app.CreateLayout( "Linear", "Top,VCenter" )
	CreateActionBar();
	lay.AddChild( video );
	video.SetFile( "Misc/music.mp4"  );
	video.SetOnComplete( comp );
	video.SetOnReady( play );
		gif = app.CreateGifViewer();
  plgDir = gif._GetPlgDir();
  gifView = gif.CreateGifImage( null , 0.9, 0.4 );
  //lay.AddChild( gifView );
	//Create music list.
	spin = app.CreateSpinner( "");//-- Choose the Song --,Alexio La Bestia - Te vas a morir tu,Almighty - Invictux,BAD_BUNNY_-_TU_NO_METES_CABRA_Video_Oficial");//[No tracks found]" )
	//Almighty - Invictux (Tiraera 2) Rip El Sica [Official Audio].mp3
	spin.SetSize( 1.0, -1 );
	spin.SetTextColor( "#348e34" );
	//spin.SetBackColor( "#DC8736" )
	rColor = "#87DC36";
	spin.SetBackGradient( utils.GetGradientColors(rColor)[0], rColor, utils.GetGradientColors(rColor)[1] )
	spin.SetOnTouch( spn_OnTouch )
	lay.AddChild( spin )
	
	layH = app.CreateLayout( "Linear", "FillX,Horizontal" )
	lay.AddChild( layH );
	//Create 'Play' button.
	btnPlay = app.CreateButton( "Play [fa-play]", 0.33, 0.07871, "FontAwesome,Gray" )
	btnPlay.SetTextColor( "#ffffff" );
	btnPlay.SetTextShadow( 3, 0, 0, "#000000" );
	//btnPlay.SetMargins( 0, 0.05, 0, 0 )
	btnPlay.SetOnTouch( btnPlay_OnTouch )
	layH.AddChild( btnPlay ) 
	
	//Create 'Pause' button.
	btnPause = app.CreateButton( "Pause [fa-pause]", 0.33, 0.07871, "FontAwesome,Gray")
	btnPause.SetTextColor( "#ffffff" );
	btnPause.SetTextShadow( 3, 0, 0, "#000000" );
	btnPause.SetOnTouch( btnPause_OnTouch )
	layH.AddChild( btnPause ) 
	
	//Create 'Stop' button.
	btnStop = app.CreateButton( "Stop [fa-stop]", 0.33, 0.07871, "FontAwesome,Gray" )
	btnStop.SetTextColor( "#ffffff" );
	btnStop.SetTextShadow( 3, 0, 0, "#000000" );
	btnStop.SetOnTouch( btnStop_OnTouch )
	layH.AddChild( btnStop ) 
	
	//Create seek bar and add to layout.
	skb = app.CreateSeekBar( 0.98, -1 )
	skb.SetBackground( "/res/drawable/pattern_carbon", "repeat");
	
	skb.SetColorFilter( "#cdcdcd", "overlay"  )
	skb.SetBackAlpha( 0.74 );
	//skb.SetBackGradient(  "#efefef", "#cdcdcd", "#fafafa" );
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
	//spin.SetList( mp3List )
	
	//Load the first file found.
	//player.SetFile( "/storage/emulated/0/Download/TeraBox/Download/Music/Almighty - Invictux (Tiraera 2) Rip El Sica [Official Audio].mp3");//Alexio La Bestia - Te Vas A Morir Tu [Official Audio].mp3" );// + spin.GetText() )
	dur = null;
	
	//Start timer to update seek bar every second.
	setInterval( "Update()", 100 )
	gifView.SetImage(app.GetAppPath()+'/'+gifFile+'.gif');
	dur1 = gifView.GetDuration();
	alert(dur1);
  gifView.OnAnimationComplete( repeatCheck );
  setSpeed("Normal");
  gifView.Play();
   //Create media store and set callbacks.
    media = app.CreateMediaStore()
    media.SetOnMediaResult( media_OnMediaResult )
 app.ShowProgress( "Searching..." )
    media.QueryMedia( "", "artist,album", "external" )
}

//Show media query results.
function media_OnMediaResult( result )
{
    var s = "", t = "";
    for( var i=0; i<result.length; i++ )
    {
        var item = result[i];

        s += item.title+", "+item.albumId+", "+item.album
            +", "+item.artistId+", "+ item.artist+
            ", "+ Math.round(item.duration/1000)+"s" +
            ", "+ Math.round(item.size/1000)+"KB" + 
            ", "+ item.uri +"\n\n";
            t += item.title + ",";
            Uri[i]=item.uri;
    }
    
    spin.SetList( t )
    app.HideProgress()
    //alert( s.substr(0,2048) )
    
    //Play first file found.
    if( result.length > 0 )
        player.SetFile( result[0].uri )
}
function comp()
{
video.Play();
}

function play()
{
	video.Play();
}

//Called when file is ready to play.
function player_OnReady()
{
	//Get file duration.
	dur = player.GetDuration()
	//player.SeekTo( 191.438 );
	player.Play();
	btnPlay.SetTextColor( "#33fe33" );
	btnPause.SetTextColor( "#ffffff" );
	btnStop.SetTextColor( "#ffffff" );
	btnPlay.SetTextShadow( 3, 0, 0, "#000000" );
	app.ShowPopup( "Ready" )
}

//Called when playback has finished.
function player_OnComplete()
{
player_OnReady();
	app.ShowPopup( "Finished" )
}

//Handle file select.
function spn_OnTouch( item, index)
{
	//player.SetFile( "/sdcard/music/" + item );
	/*
	if(item=="Almighty - Invictux") {
	player.SetFile( "/storage/emulated/0/Download/TeraBox/Download/Music/Almighty - Invictux (Tiraera 2) Rip El Sica [Official Audio].mp3");
	}else{
	player.SetFile( "/storage/emulated/0/Download/TeraBox/Download/Music/Alexio La Bestia - Te Vas A Morir Tu [Official Audio].mp3");
	}*/
	player.SetFile( Uri[index] );
}

//Handle 'Play' button.
function btnPlay_OnTouch() 
{
	player.Play()
	btnPlay.SetTextColor( "#33fe33" );
	btnPause.SetTextColor( "#ffffff" );
	btnStop.SetTextColor( "#ffffff" );
}

//Handle 'Pause' button.
function btnPause_OnTouch() 
{
	player.Pause()
	btnPlay.SetTextColor( "#ffffff" );
	btnPause.SetTextColor( "#efef34" );
	btnStop.SetTextColor( "#ffffff" );
}

//Handle 'Stop' button.
function btnStop_OnTouch() 
{
	player.Stop()
	btnPlay.SetTextColor( "#ffffff" );
	btnPause.SetTextColor( "#ffffff" );
	btnStop.SetTextColor( "#ef3434" );
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
	txt.SetText( convertSecondsToHoursMinutesSeconds(prog));//convertMS(parseInt(prog*10)).seconds);
	//if(prog >= 250.443) player.Stop(), player_OnReady();
}

//Called when user touches volume bar.
function skbVol_OnTouch( value )
{
	player.SetVolume( value, value )
}

function convertSecondsToHoursMinutesSeconds(seconds) {
  var hours = Math.floor(seconds / 3600);
  if(hours<10){ hours = "0" + hours; }
  var minutes = Math.floor((seconds - (hours * 3600)) / 60);
  if(minutes<10){ minutes= "0" + minutes; }
  var remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
  if(remainingSeconds<10){ remainingSeconds = "0" + parseFloat(remainingSeconds).toFixed(0); } else {"0" + parseFloat(remainingSeconds).toFixed(0); }
  var sec = parseFloat(remainingSeconds).toFixed(0);
  if(sec.length==1) sec = "0" + sec;
  return hours + ":" + minutes + ":" + sec;
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
//alert(JSON.stringify(time)); // { hours: 34, minutes: 17, seconds: 36 }