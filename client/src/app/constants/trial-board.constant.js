const TrialBoard = {
        title: "Example board",
        static: true,
        lanes: [
            {
                title: "To Do",
                id: 0,
                position: 0,
                cards: [
                    {
                        id: 0,
                        position: 0,
                        title: "Refactoring app layout",
                        description: "A refactor is needed",
                    }
                ],
                archivedCards: [],
            },
            {
                title: "In progress",
                position: 1,
                id: 1,
                cards: [
                    {
                        id: 0,
                        position: 0,
                        title: "Change logo",
                        description: "Update with the new logo",
                    },
                    {
                        id: 1,
                        position: 1,
                        title: "Add payment service",
                        description: "Payment logic are required",
                    },
                    {
                        id: 2,
                        position: 2,
                        title: "Implement sign-up with facebook",
                        description: "Need to authenticate with facebook",
                    },
                    {
                        id: 3,
                        position: 3,
                        title: "Implement sign-up with google",
                        description: "Need to authenticate with google",
                    }
                ],
                archivedCards: [],
            },
            {
                title: "Done",
                position: 2,
                id: 2,
                cards: [
                    {
                        id: 0,
                        position: 0,
                        title: "Implement app state",

                    },
                    {
                        id: 1,
                        position: 1,
                        title: "Implement login auth",
                    }
                ],
                archivedCards: [
                    {
                        id: 2,
                        position: -1,
                        title: "Refactoring server API",
                        description: "A refactor is needed",
                    }
                ],
            }
        ]
    };

export default TrialBoard;
