/** Wait for some time to happen - for delaying and testing async code */
export default function wait(time, arg) {
  return new Promise((resolve) => setTimeout(resolve, time, arg));
}
