board = []

def columnChecker(board):
    if len(board) == len(set(board)):
        return True
    else:
        return False

def dcheck(board):
    for i in range(len(board)):
        current = board[i]
        for j in range(i+1, len(board)):
            checkers = board[j]
            if current == checkers + (j-i):
                return False
            if current == checkers - (j-i):
                return False
    return True

def grandChecker(board):
    if columnChecker(board):
        if dcheck(board):
            return True
    return False

if grandChecker(board):
    print("Check passed!")
else:
    print("Nahiiiiiiiii")
