
app.LoadPlugin( "GifViewer" );
var  dur = 0, repeat = true;

/*Called when application is started.*/
function OnStart()
{   
  /*Create layout that fills the screen.*/
  lay = app.CreateLayout( "Linear", "FillXY,VCenter" );

  /*Create GIF Image view.*/
  gif = app.CreateGifViewer();
  plgDir = gif._GetPlgDir();
  gifView = gif.CreateGifImage( null , 0.9, 0.4 );
  lay.AddChild( gifView );

  /*Create GIF list.*/
  spin = app.CreateSpinner( "...,DOG,CAT" );
  spin.SetSize( 0.8, -1 );
  spin.SetOnTouch( spn_OnTouch );
  lay.AddChild( spin );

  /* Create Buttons layout*/
  btnLay = app.CreateLayout( "Linear", "Horizontal,Center,VCenter" );
  btnLay.SetMargins(0,0.05,0,0);
  btnPlay = app.CreateButton( "Play", 0.3, 0.1 );
  btnPlay.SetOnTouch( btnPlay_OnTouch );
  btnLay.AddChild( btnPlay ); 
  btnStop = app.CreateButton( "Stop", 0.3, 0.1 );
  btnStop.SetOnTouch( btnStop_OnTouch );
  btnLay.AddChild( btnStop ); 
  btnRepeat = app.CreateToggle( "Repeat", 0.3, 0.1 );
  btnRepeat.SetOnTouch( btnRepeat_OnTouch );
  btnRepeat.SetChecked( repeat );
  btnLay.AddChild( btnRepeat );
  lay.AddChild( btnLay );

  /* Layout for speed control*/
  speedLay = app.CreateLayout( "Linear", "Horizontal,Center,VCenter" );
  speedLay.SetMargins(0,0.05,0,0);
  speedText = app.CreateText ("Animation Speed: ");
  speedText.SetTextSize( 18 );
  speedLay.AddChild( speedText );
  speedSpin = app.CreateSpinner( "Slow,Normal,Fast" );
  speedSpin.SetSize( 0.3, -1 );
  speedSpin.SetOnTouch( setSpeed );
  speedSpin.SelectItem('Normal');
  speedLay.AddChild( speedSpin );
  lay.AddChild( speedLay );

  /*  Create Duration Text*/
  txt = app.CreateText( "0 / 0" );
  txt.SetTextSize( 18 );
  txt.SetMargins(0,0.05,0,0);
  lay.AddChild( txt );

  /*Add main layout to app.*/
  app.AddLayout( lay );

  /* Update position and duration*/
  setInterval("Update()", 25);
  alert( gif.GetVersion() );
}

/*Handle GIF select.*/
function spn_OnTouch( item )
{
  gifView.Stop();
  var gifFile;
  switch (item) {
    case "DOG": gifFile = 'img/music_dog'; break;
    case "CAT":  gifFile = 'img/pet_cat'; break;
    default: gifFile = 'blank';
   }
  gifView.SetImage(plgDir+'/'+gifFile+'.gif');
  dur = gifView.GetDuration();
  setSpeed();  
  gifView.OnAnimationComplete( repeatCheck );
}

/*Handle Play button.*/
function btnPlay_OnTouch() 
{
  gifView.Play();
}

/*Handle Pause button.*/
function btnStop_OnTouch() 
{
  gifView.Stop();
}

/* Handle Repeat Button*/
function btnRepeat_OnTouch( checked ) {
  repeat = checked;
}

/*Update duration text.*/
function Update()
{
  var  prog = gifView.GetPosition();
  txt.SetText( prog + ' / ' + dur );
}

/* OnAnimationComplete callback*/
function repeatCheck() {
  if ( !repeat ) { gifView.Stop(); gifView.SeekTo(0); }
}

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