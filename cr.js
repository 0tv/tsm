// code by favel <3
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

var button = document.createElement('div');
button.classList.add("scroller_item", "scroller_item_giant", "has_image", "has_description", "ns");
button.setAttribute('id', 'game_cheese');
button.setAttribute('data-hover', 'hover');
button.setAttribute('data-hit', 'idonthaveahitsoundlol');

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
solo.removeChild(custom);
solo.appendChild(button);
solo.appendChild(custom);

// js b***sh**tery
const base64Url = "data:@file/octet-stream;base64,eyJiYWd0eXBlIjoiN2JhZyIsInNwaW5ib251c2VzIjoiVC1zcGlucyIsImNvbWJvdGFibGUiOiJtdWx0aXBsaWVyIiwic2VlZF9yYW5kb20iOnRydWUsInNlZWQiOjAsImNhbl9yZXRyeSI6dHJ1ZSwic3RvY2siOjAsImNsdXRjaCI6dHJ1ZSwibm9sb2Nrb3V0IjpmYWxzZSwiYm9hcmR3aWR0aCI6MTAsImJvYXJkaGVpZ2h0IjoyMCwic3Vydml2YWxtb2RlIjoibGF5ZXIiLCJzdXJ2aXZhbF9tZXNzaW5lc3MiOjEwMCwic3Vydml2YWxfY2FwIjoxMDAsInN1cnZpdmFsX2xheWVyX2FtdCI6OSwic3Vydml2YWxfbGF5ZXJfbm9uIjp0cnVlLCJzdXJ2aXZhbF9sYXllcl9taW4iOjMsInN1cnZpdmFsX3RpbWVyX2l0diI6NjAsImFsbG93MTgwIjp0cnVlLCJraWNrc2V0IjoiU1JTKyIsImFsbG93X2hhcmRkcm9wIjp0cnVlLCJkaXNwbGF5X25leHQiOnRydWUsImRpc3BsYXlfaG9sZCI6dHJ1ZSwibmV4dGNvdW50Ijo1LCJpbmZpbml0ZW1vdmVtZW50IjpmYWxzZSwiZGlzcGxheV9zaGFkb3ciOnRydWUsImFyZSI6MCwibGluZWNsZWFyX2FyZSI6MCwiZyI6MC4wMiwibGV2ZWxzIjpmYWxzZSwibWFzdGVybGV2ZWxzIjpmYWxzZSwic3RhcnRpbmdsZXZlbCI6MSwibGV2ZWxzcGVlZCI6MSwibGV2ZWxzdGF0aWMiOnRydWUsImxldmVsc3RhdGljc3BlZWQiOjEwLCJnYmFzZSI6MC44LCJnc3BlZWQiOjAuMDA3LCJsb2NrdGltZSI6MzAsInhfcmVzdWx0dHlwZSI6InRpbWUiLCJvYmplY3RpdmVfdHlwZSI6ImdhcmJhZ2UiLCJvYmplY3RpdmVfY291bnQiOjEwMCwib2JqZWN0aXZlX3RpbWUiOjEyMDAwMCwidG9wb3V0aXNjbGVhciI6dHJ1ZSwicHJvIjp0cnVlLCJtaXNzaW9uIjoiMTAwTCBDSEVFU0UgUkFDRSIsInN0cmlkZSI6ZmFsc2UsImNvdW50ZG93biI6dHJ1ZSwiY291bnRkb3duX2NvdW50IjozLCJjb3VudGRvd25faW50ZXJ2YWwiOjEwMDAsInByZWNvdW50ZG93biI6MzAwMCwicHJlc3RhcnQiOjEwMDAsInpvb21pbnRvIjoic2xvdyIsInNsb3RfY291bnRlcjEiOiJzdG9wd2F0Y2giLCJzbG90X2NvdW50ZXIyIjoibGluZXMiLCJzbG90X2NvdW50ZXIzIjoicGllY2VzIiwic2xvdF9jb3VudGVyNCI6ImtleXMiLCJzbG90X2NvdW50ZXI1IjoiZ2FyYmFnZSIsImFic29sdXRlX2xpbmVzIjp0cnVlLCJkaXNwbGF5X3Byb2dyZXNzIjp0cnVlfQ==";
const binary = atob(base64Url.split(",")[1]);
const byteArray = new Uint8Array(binary.length);
for (let i = 0; i < binary.length; i++) {
  byteArray[i] = binary.charCodeAt(i);
}
const blob = new Blob([byteArray], { type: "application/json" });
const file = new File([blob], "cheese.ttp", { type: "application/json" }); // create a File object from the Blob

// Create the drag event
const dragEvent = new DragEvent("drop", {
  dataTransfer: new DataTransfer(),
  bubbles: true,
  cancelable: true,
});

// Add the file to the data transfer object
dragEvent.dataTransfer.items.add(file);

var loaded = false;

function load() {
  document.getElementById('menus').dispatchEvent(dragEvent);
}

function begin() {
  document.getElementById('start_custom').click();
};

var loadingPoints = 17;
var loadingDuration = 1500;

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
      }, loadingDuration);
  } else {
    begin();
  };

};
