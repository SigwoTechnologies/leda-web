/* 
<Form<IChannelDTO> onSubmit={createNewChannel} form={{ resolver: yupResolver(schema) }}>
            <TextInput label="Channel name here" name="channelName" />
            Create new channel
          </Form>
*/

const NftNameComponent = () => (
  <div className="col-md-12">
    <div className="input-box pb--20">
      <label htmlFor="name" className="form-label">
        NFT Name *
      </label>
      <input id="name" placeholder="e. g. `Happy Ape`" />
    </div>
  </div>
);

export default NftNameComponent;
