let importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("./images/icons/", true, /\.svg$/));
} catch (e) {
  console.log(e);
}
