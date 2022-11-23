import Image from 'next/image';
import Anchor from '@ui/anchor';
import { FaLayerGroup } from 'react-icons/fa';

const ItemStatsComponent = () => (
  <div className="rn-upcoming-area rn-section-gapTop" style={{ paddingTop: '20px' }}>
    <div className="container" style={{ padding: '0' }}>
      <div className="row">
        <div className="col-12">
          <div className="table-title-area d-flex">
            <FaLayerGroup />
            <h3>Dogs Collection</h3>
          </div>
          <div className="box-table table-responsive">
            <table className="table upcoming-projects">
              <thead>
                <tr>
                  <th>
                    <span>SL</span>
                  </th>
                  <th>
                    <span>Product</span>
                  </th>
                  <th>
                    <span>Volume</span>
                  </th>
                  <th>
                    <span>24h%</span>
                  </th>
                  <th>
                    <span>7d%</span>
                  </th>
                  <th>
                    <span>Floor Price</span>
                  </th>
                  <th>
                    <span>Owners</span>
                  </th>
                  <th>
                    <span>Items</span>
                  </th>
                </tr>
              </thead>
              <tbody className="ranking">
                <tr className="color-light">
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <div className="product-wrapper d-flex align-items-center">
                      <Anchor path="/" className="thumbnail">
                        <Image
                          src="https://source.unsplash.com/random/100x100"
                          alt="Nft_Profile"
                          width={56}
                          height={56}
                          layout="fixed"
                        />
                      </Anchor>

                      <span>Secure 25</span>
                    </div>
                  </td>
                  <td>
                    <span>7,50,000</span>
                  </td>
                  <td>
                    <span className="color-danger">-310.53%</span>
                  </td>
                  <td>
                    <span className="color-green">+62.21%</span>
                  </td>
                  <td>
                    <span>33.02</span>
                  </td>
                  <td>
                    <span>3k</span>
                  </td>
                  <td>
                    <span>10k</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ItemStatsComponent;
