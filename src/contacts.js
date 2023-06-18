import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import API from "./api/contact"

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  // let contacts = await localforage.getItem("contacts");
  console.log(query, '====')
  let { data: contacts } = await API.getList(query);
  if (!contacts) contacts = [];
  return contacts
}

export async function createContact() {
  await fakeNetwork();
  let first_name = Math.random().toString(36).substring(2, 9);
  let last_name = Math.random().toString(36).substring(2, 9);
  let avatar = `https://robohash.org/${Math.round(Math.random() * 100)}`
  let contact = {
    first_name,
    last_name,
    avatar
  };
  let response = await API.create(contact)
  await set(response.data);
  return response.data;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  let { data: contact } = await API.getDetail(id);
  return contact ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  let contact = await API.update(id, updates)
  await set(contact.data);
  return contact.data;
}

export async function deleteContact(id) {
  console.log(id, '888')
  let { data } = await API.remove(id);
  return !!data.ok;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}