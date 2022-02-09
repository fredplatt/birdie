import { cleanup, render, screen } from "@testing-library/react";
import fetchMock from "fetch-mock";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { GlobalStore } from "../common/state/store";
import App from "../App";
import { CleanTimestamp } from "../common/functions/CleanTimestamp";
import { mockVisits } from "./testData";

afterEach(() => {
  fetchMock.reset();
  cleanup();
});

// Main App elements
test("renders header", () => {
  render(
    <GlobalStore>
      <App />
    </GlobalStore>
  );
  const header = screen.getByText(/portal/i);
  expect(header).toBeInTheDocument();
});

test("renders loading message", () => {
  render(
    <GlobalStore>
      <App />
    </GlobalStore>
  );
  const message = screen.getByText(/loading/i);
  expect(message).toBeInTheDocument();
});

test("Get and display visits with loading message", async () => {
  act(async () => {
    fetchMock.mock(
      "http://localhost:8000/api/visits/ad3512a6-91b1-4d7d-a005-6f8764dd0111",
      {
        method: "GET",
        body: mockVisits,
        status: 200,
      }
    );

    await fetch(
      "http://localhost:8000/api/visits/ad3512a6-91b1-4d7d-a005-6f8764dd0111",
      {
        method: "GET",
      }
    )
      .then(function (res) {
        expect(res.status).toEqual(200); // Pass
        return res.json(); // return here
      })
      .then(function (json) {
        expect(json.body).toEqual(mockVisits); // Fail expected value to equal: {"response": "data from the server"} Received: undefined
      })
      .then(async () => {
        render(
          <GlobalStore>
            <App />
          </GlobalStore>
        );
        const date = await screen.findByText(/12\/05\/2019/i);
        expect(date).toBeInTheDocument();
      });
  });
});

// Menubar elements
test("renders birdie logo and menubar", () => {
  render(
    <GlobalStore>
      <App />
    </GlobalStore>
  );
  const logo = screen.getByAltText(/birdie/i);
  expect(logo).toBeInTheDocument();
});

test("renders email link", () => {
  render(
    <GlobalStore>
      <App />
    </GlobalStore>
  );
  const contactElement = screen.getByText(/Contact/i);
  expect(contactElement).toBeInTheDocument();
  expect(contactElement).toHaveAttribute(
    "href",
    "mailto:support@birdie.care?subject=Family Portal"
  );
});

test("renders links for different care recipients", () => {
  render(
    <GlobalStore>
      <App />
    </GlobalStore>
  );
  const selectorElement = screen.getByText(/Individual 3/i);
  expect(selectorElement).toBeInTheDocument();
});

test("clicking links updates global state", () => {
  render(
    <GlobalStore>
      <App />
    </GlobalStore>
  );
  const message = screen.getByText(/Loading care records for individual 1/i);
  expect(message).toBeInTheDocument();
  userEvent.click(screen.getByText(/Individual 3/i));
  const updatedMessage = screen.getByText(
    /Loading care records for individual 3/i
  );
  expect(updatedMessage).toBeInTheDocument();
});

test("timestamps are cleaned properly", () => {
  expect(CleanTimestamp("2021-12-11T09:41:28")).toBe("11/12/2021, 09:41");
});
