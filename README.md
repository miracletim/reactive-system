# Reactive System with Watchers

A minimal reactive state system using JavaScript proxies.
Supports nested object tracking and custom watchers.

## Usage

```js
const state = reactive({
  user: {
    profile: { name: "Miracle", age: 23 },
  },
});

watch("user.profile.name", (newValue) => {
  console.log("Name changed to:", newValue);
});

state.user.profile.name = "Kreativ";
state.user.profile = { name: "Zion" }; // Will also be watched!
```
