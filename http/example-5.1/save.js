export function saveAddress(addresses, address) {
  if (address.id) {
    const index = addresses.findIndex(
      (adr) => adr.id === parseInt(address.id, 10)
    );

    address.id = parseInt(address.id, 10);
    addresses[index] = address;
  } else {
    const nextId = addresses.length + 1;
    address.id = nextId;
    addresses.push(address);
  }
  return addresses;
}
