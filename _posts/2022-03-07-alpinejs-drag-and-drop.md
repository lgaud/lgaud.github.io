---
layout: post
title:  "Alpine.js drag and drop with Bootstrap 5"
description: An example of Alpine.js drag and drop using Bootstrap 5 CSS. Most examples use Tailwind but the details of the CSS positioning are important!
tag: alpine.js
---

I recently learned of Alpine.js and I find it really useful for adding bits of interactivity when you don't want a full blown front end framework with a build process.

One thing I struggled with was implementing drag and drop. The available samples were all using Tailwind, and, it turns out the details of the CSS positioning are important and the translation from Tailwind to Bootstrap took a bit of trial and error.


```html
<main class="container">
  <h1>Rank Ice Cream Flavors</h1>
  <div x-data="{ items: ['Chocolate', 'Vanilla', 'Strawberry', 'Cookies and Creme'], newItem:'', dragging: null, dropping: null}" @drop.prevent="items=dragDropList(items, dragging, dropping)" @dragover.prevent="$event.dataTransfer.dropEffect = &quot;move&quot;">
    <div class="list-group mb-3">
      <template x-for="(item, index) in items" :key="index">
        <div class="position-relative list-group-item" draggable="true" :class="{'border border-primary': dragging === index}" @dragstart="dragging = index" @dragend="dragging = null">
          <div><i class="bi bi-grip-vertical"></i><span x-text="item"></span></a><button type="button" class="btn btn-outline-danger btn-sm float-end" aria-label="Delete" @click="items.splice(index, 1);"><i class="bi-trash"></i></button></div>
          <div class="position-absolute" style="top: 0; bottom: 0; right: 0; left: 0;" x-show.transition="dragging !== null" :class="{'bg-secondary': dropping === index}" @dragenter.prevent="if(index !== dragging) {dropping = index}" @dragleave="if(dropping === index) dropping = null"></div>
        </div>
      </template>
    
       <div class="input-group mt-2"><input type="text" class="form-control form-inline" x-model="newItem"></input><button class="btn btn-primary form-inline" x-bind:disabled="newItem == ''"  @click="items.push(newItem);newItem=''">Add Flavor</button></div>
    </div>
  </div>
  <hr>
  <p class="text-muted">The drag and drop logic comes from <a href="https://codepen.io/ranjan-purbey/pen/xoEMOM">alpine-sortable</a> by Ranjan Purbey but it turns out the CSS positioning is important for this to work and it wasn't obvious how to convert from Tailwind to Bootstrap.</p>
</main>
```

```js
var dragDropList = function (items, dragging, dropping) {
  if (dragging !== null && dropping !== null) {
    if (dragging < dropping) {
      items = [
        ...items.slice(0, dragging),
        ...items.slice(dragging + 1, dropping + 1),
        items[dragging],
        ...items.slice(dropping + 1)
      ];
    } else {
      items = [
        ...items.slice(0, dropping),
        items[dragging],
        ...items.slice(dropping, dragging),
        ...items.slice(dragging + 1)
      ];
    }
    dropping = null;
  }
  return items;
};
```
[See on Codepen](https://codepen.io/lgaud/pen/abVEwgz)

