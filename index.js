const watchers = new Map();

function watch(path, callback) {
  watchers.set(path, callback);
}

function reactive(obj, path = "") {
  return new Proxy(obj, {
    set(target, key, value) {
      const fullPath = path ? `${path}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        value = reactive(value, fullPath);
      }
      target[key] = value;

      if (watchers.has(fullPath)) {
        watchers.get(fullPath)(value);
      }
      return true;
    },
    get(target, key, receiver) {
      const val = Reflect.get(target, key, receiver);
      if (typeof val === "object" && val !== null) {
        const fullPath = path ? `${path}.${key}` : key;
        return reactive(val, fullPath);
      }
      return val;
    },
  });
}

const state = reactive({
  user: {
    profile: {
      name: "Miracle",
      age: 23,
    },
  },
});

watch("user.profile", (newProfile) => {
  console.log("Profile changed to:", newProfile);
});

watch("user.profile.name", (newValue) => {
  console.log("Name changed to:", newValue);
});

// Testing
state.user.profile.name = "Timothy";
state.user.profile.age = 24;
state.user.profile.name = "Kreativ";
state.user.profile = { name: "Zion" };
