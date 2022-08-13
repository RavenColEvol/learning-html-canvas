export const BLOCK_DIM = 20;
export const row = 20;
export const col = 10;
export const BOARD_WIDTH = BLOCK_DIM * col;
export const BOARD_HEIGHT = BLOCK_DIM * row;

export const pieces = [
    // o block
    {
        dim: [
            [1, 1],
            [1, 1],
        ],
        color: "yellow",
    },
    // z block
    {
        dim: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        color: "red",
    },
    // s block
    {
        dim: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        color: "green",
    },
    // t block
    {
        dim: [
            [0, 1, 0],
            [1, 1, 1],
        ],
        color: "purple",
    },
    // j block
    {
        dim: [
            [1, 0, 0],
            [1, 1, 1],
        ],
        color: "blue",
    },
    // l block
    {
        dim: [
            [0, 0, 1],
            [1, 1, 1],
        ],
        color: "orange",
    },
    // i block
    { dim: [[1, 1, 1, 1]], color: "lightblue" },
];
