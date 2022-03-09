import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Inquiry from "./pages/inquiry";
import Header from "./organism/header";

afterEach(() => cleanup());

describe('test', () => {
    it('test', async() => {
        render(<Inquiry />);
        await render(<Header />);
        userEvent.click(screen.getByText("送信"));
        screen.debug(await screen.getByRole("heading"));
    })
})