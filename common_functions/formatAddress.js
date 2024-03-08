function formatAddress(address) {
 return Object.values(address || {})
 .filter(value => value)
 .join(',\n');
}
export default formatAddress
