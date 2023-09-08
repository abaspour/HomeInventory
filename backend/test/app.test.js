const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return "API Running" when GET /', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('API Running');
        done();
      });
  });

  // Add more test cases for your API endpoints as needed
});
