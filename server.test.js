import("chai").then((chai) => {
  import("chai-http").then((chaiHttp) => {
    import("../server").then((server) => {

      const expect = chai.expect;
      chai.use(chaiHttp);

      describe("Server API Tests", () => {
        describe("POST /signup", () => {
          it('should return 200 OK and "Signup successful."', (done) => {
            chai
              .request(server)
              .post("/signup")
              .send({ username: "testuser", password: "testpassword" })
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Signup successful.");
                done();
              });
          });
        });

        describe("POST /login", () => {
          it('should return 200 OK and "Login successful."', (done) => {
            chai
              .request(server)
              .post("/login")
              .send({ username: "testuser", password: "testpassword" })
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Login successful.");
                done();
              });
          });
        });

        //This test case ensures that the /send-message endpoint sends a message successfully.
        describe("POST /send-message", () => {
          it('should return 200 OK and "Message sent successfully."', (done) => {
            chai
              .request(server)
              .post("/send-message")
              .send({
                sender: "testuser",
                recipient: "recipientuser",
                message: "Test message",
              })
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("Message sent successfully.");
                done();
              });
          });
        });

        //This test case ensures that the /fetch-messages endpoint fetches messages successfully.
        describe("GET /fetch-messages", () => {
          it("should return 200 OK and an array of messages", (done) => {
            chai
              .request(server)
              .get("/fetch-messages")
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                // Add more assertions based on the response format
                done();
              });
          });
        });

        //This test case checks whether the server correctly handles invalid login credentials.
        describe("POST /login with invalid credentials", () => {
          it("should return 401 Unauthorized for invalid credentials", (done) => {
            chai
              .request(server)
              .post("/login")
              .send({ username: "invaliduser", password: "invalidpassword" })
              .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.text).to.equal("Invalid username or password.");
                done();
              });
          });
        });

        //This test case checks whether the server correctly handles requests with missing username or password.
        describe("POST /login with missing username or password", () => {
          it("should return 400 Bad Request for missing username or password", (done) => {
            chai
              .request(server)
              .post("/login")
              .send({ username: "", password: "testpassword" }) // Missing username
              .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal(
                  "Username and password are required."
                );
                done();
              });
          });

          it("should return 400 Bad Request for missing username or password", (done) => {
            chai
              .request(server)
              .post("/login")
              .send({ username: "testuser", password: "" }) // Missing password
              .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal(
                  "Username and password are required."
                );
                done();
              });
          });
        });

        // Example for testing the cron job
        describe("Cron Job", () => {
          it("should delete messages older than 5 minutes", (done) => {
            // Perform some action that triggers the cron job (e.g., wait for a few minutes)
            setTimeout(() => {
              // After waiting, make an HTTP request to fetch messages
              chai
                .request(server)
                .get("/fetch-messages")
                .end((err, res) => {
                  expect(res).to.have.status(200);
                  // Check if messages older than 5 minutes are deleted
                  // Assert based on the response from the fetch-messages endpoint
                  done();
                });
            }, 300000); // Wait for 5 minutes (300000 milliseconds)
          }).timeout(400000); // Set a timeout longer than the wait time
        });
      });
    });
  });
});
