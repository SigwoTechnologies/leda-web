const NftDescriptionComponent = () => (
  <div className="col-md-12">
    <div className="input-box pb--20">
      <label htmlFor="Description" className="form-label">
        Description *
      </label>
      <textarea
        id="description"
        rows={3}
        placeholder="e. g. “After purchasing the product you can get item...”"
      />
    </div>
  </div>
);

export default NftDescriptionComponent;
