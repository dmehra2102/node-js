export function deleteAddress(addresses, id) {
  const parsedId = parseInt(id, 10);

  const filteredAddresses = addresses.filter((item) => item.id !== parsedId);
  return filteredAddresses;
}
