const Spinner = () => {
  return (
    <div className="loadingSpinnerContainer" data-testid="spin-container">
      <div className="loadingSpinner" data-testid="inner-container" />
      <p>loading...</p>
    </div>
  )
}
export default Spinner
