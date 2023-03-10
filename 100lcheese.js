/*
  Welcome to a javascript code file containing some of the worst coding practices you will ever see!
  
  Author: Favel (w/ ChatGPT for the drag/drop simulation code)
  Version: 1.1
  
  --------------------------------------
  
  What is this? It's a script that adds an additional option to the solo gamemodes in TETR.IO,
  the gamemode in question being 100l cheese race.
  
  Why make this? I suck at downstacking. I get better by using this mode (I have stats to back this up)
  I thought it'd be nice to make it alot more convenient to access it as a menu option rather than drag and dropping
  a file onto the page every time (on some platforms you can't in the first place)
  
  How does it work? By messing with the page CSS and HTML, and also doing weird JS stuff.
  More specifically: It adds a CSS stylesheet containing properties for the mode, so that it does not look exactly like another
  gamemode, it also kinda copies some of the CSS for having stuff like TL blocked on an anon account, this is used to temporarily
  block the 100l cheese race button while it's "loading" the file for the first time. Ok you get the point with the UI stuff probably.
  For the code side, what this does is basically pretend to drag the 100l cheese race preset file onto the page, followed by pretending
  to click the start button on the custom game options page. This is absolutely not the best way to do it, but it works, lol.
  
  What the hell is that giant jumble of letters?!
  That's the 100l cheese race preset file encoded in base64 as a data URI, don't believe me? Throw it into a decoder :-)
  Infact, I do recommend that you verify that the file is not malicious, and that this code is not malicious, that's just a good practice really
  
  Sorry if all this text is a bit redundant or useless, I'm writing this quite tired at 1:36AM :woomy:
  
  TLDR: Code that adds another gamemode to the solo section of TETR.IO
  
*/

// The stylesheet containing data for how the 100l cheese race button should look, along with how it should look when loading
var s = document.createElement('style');
s.innerText = `

#game_cheese {
    background-color: #192627;
    border-top: 3px solid #24393B;
    border-left: 3px solid #1D2E2F;
    border-bottom: 3px solid #0D1415;
}

#game_cheese > h1, #game_cheese > p {
  color: #7CB0B8;
}

#game_cheese > img {
  filter: hue-rotate(-30deg);
}

body .scroller_item.block_loading::after {
    content: attr(data-block-reason);
    color: #fff;
    text-shadow: 0 2px 8px #000;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 1em;
    display: table-cell;
    vertical-align: middle;
    font-size: 2.5em;
    background-color: #000A;
    pointer-events: none;
}

`;

document.body.appendChild(s);

// The button itself!! Not a very good variable name IMO, but I mean, its good enough really, not like there's any other button we'd refer to alot.
var button = document.createElement('div');
button.classList.add("scroller_item", "scroller_item_giant", "has_image", "has_description", "ns"); // idk if all these are needed lol
button.setAttribute('id', 'game_cheese');
button.setAttribute('data-hover', 'hover');
button.setAttribute('data-hit', 'idonthaveahitsoundlol');

// Idk I can't be asked to make my own icon thing for it..
var image = new Image();
image.src = "res/customsolo.svg";
button.appendChild(image);

var title = document.createElement('h1');
title.innerText = "CHEESE RACE";
button.appendChild(title);

var description = document.createElement('p');
description.innerText = "downstack 100 lines as quickly or efficiently as possible";
button.appendChild(description);

let solo = document.getElementById('solo_menu');
let custom = solo.children[3];
// Element re-ordering, idk if this is a good way to do it but, it works!
solo.removeChild(custom);
solo.appendChild(button);
solo.appendChild(custom);

// Ooook, stuff gets weird here, this is the part with the TTP file encoded as b64, along with some ChatGPT code for drag/drop
const base64Url = "data:@file/octet-stream;base64,eyJiYWd0eXBlIjoiN2JhZyIsInNwaW5ib251c2VzIjoiVC1zcGlucyIsImNvbWJvdGFibGUiOiJtdWx0aXBsaWVyIiwic2VlZF9yYW5kb20iOnRydWUsInNlZWQiOjAsImNhbl9yZXRyeSI6dHJ1ZSwic3RvY2siOjAsImNsdXRjaCI6dHJ1ZSwibm9sb2Nrb3V0IjpmYWxzZSwiYm9hcmR3aWR0aCI6MTAsImJvYXJkaGVpZ2h0IjoyMCwic3Vydml2YWxtb2RlIjoibGF5ZXIiLCJzdXJ2aXZhbF9tZXNzaW5lc3MiOjEwMCwic3Vydml2YWxfY2FwIjoxMDAsInN1cnZpdmFsX2xheWVyX2FtdCI6OSwic3Vydml2YWxfbGF5ZXJfbm9uIjp0cnVlLCJzdXJ2aXZhbF9sYXllcl9taW4iOjMsInN1cnZpdmFsX3RpbWVyX2l0diI6NjAsImFsbG93MTgwIjp0cnVlLCJraWNrc2V0IjoiU1JTKyIsImFsbG93X2hhcmRkcm9wIjp0cnVlLCJkaXNwbGF5X25leHQiOnRydWUsImRpc3BsYXlfaG9sZCI6dHJ1ZSwibmV4dGNvdW50Ijo1LCJpbmZpbml0ZW1vdmVtZW50IjpmYWxzZSwiZGlzcGxheV9zaGFkb3ciOnRydWUsImFyZSI6MCwibGluZWNsZWFyX2FyZSI6MCwiZyI6MC4wMiwibGV2ZWxzIjpmYWxzZSwibWFzdGVybGV2ZWxzIjpmYWxzZSwic3RhcnRpbmdsZXZlbCI6MSwibGV2ZWxzcGVlZCI6MSwibGV2ZWxzdGF0aWMiOnRydWUsImxldmVsc3RhdGljc3BlZWQiOjEwLCJnYmFzZSI6MC44LCJnc3BlZWQiOjAuMDA3LCJsb2NrdGltZSI6MzAsInhfcmVzdWx0dHlwZSI6InRpbWUiLCJvYmplY3RpdmVfdHlwZSI6ImdhcmJhZ2UiLCJvYmplY3RpdmVfY291bnQiOjEwMCwib2JqZWN0aXZlX3RpbWUiOjEyMDAwMCwidG9wb3V0aXNjbGVhciI6dHJ1ZSwicHJvIjp0cnVlLCJtaXNzaW9uIjoiMTAwTCBDSEVFU0UgUkFDRSIsInN0cmlkZSI6ZmFsc2UsImNvdW50ZG93biI6dHJ1ZSwiY291bnRkb3duX2NvdW50IjozLCJjb3VudGRvd25faW50ZXJ2YWwiOjEwMDAsInByZWNvdW50ZG93biI6MzAwMCwicHJlc3RhcnQiOjEwMDAsInpvb21pbnRvIjoic2xvdyIsInNsb3RfY291bnRlcjEiOiJzdG9wd2F0Y2giLCJzbG90X2NvdW50ZXIyIjoibGluZXMiLCJzbG90X2NvdW50ZXIzIjoicGllY2VzIiwic2xvdF9jb3VudGVyNCI6ImtleXMiLCJzbG90X2NvdW50ZXI1IjoiZ2FyYmFnZSIsImFic29sdXRlX2xpbmVzIjp0cnVlLCJkaXNwbGF5X3Byb2dyZXNzIjp0cnVlfQ==";
const binary = atob(base64Url.split(",")[1]);
const byteArray = new Uint8Array(binary.length);
for (let i = 0; i < binary.length; i++) {
	byteArray[i] = binary.charCodeAt(i);
};
const blob = new Blob([byteArray], { type: "application/json" });
const file = new File([blob], "cheese.ttp", { type: "application/json" }); 

const dragEvent = new DragEvent("drop", {
	dataTransfer: new DataTransfer(),
	bubbles: true,
	cancelable: true,
});

dragEvent.dataTransfer.items.add(file);
// ChatGPT weirdness ends here C:

// this really isn't neccesary I don't think, but it works
var loaded = false;

function load() {
  document.getElementById('menus').dispatchEvent(dragEvent);
}

function begin() {
  document.getElementById('start_custom').click();
};

var loadingPoints = 24;
var loadingDuration = 500;

button.onclick = e => {
  if(!loaded) {
      e.preventDefault();
      button.setAttribute('data-block-reason', 'Loading 0%');
      load();
      button.classList.add("block_loading");
      for(let i = 0; i < loadingPoints; i++) {
          setTimeout(() => {
              button.setAttribute('data-block-reason', 'Loading ' + Math.round(i / loadingPoints * 100) + '%');
          }, i / loadingPoints * loadingDuration);
      };
      setTimeout(() => {
          loaded = true;
          button.classList.remove("block_loading");
          button.click();
		  loaded = false;
      }, loadingDuration);
  } else {
    begin();
  };

};
