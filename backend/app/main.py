from fastapi import FastAPI

app = FastAPI(title="Paper Trading Platform API")
test = {
    "Brady": 1,
    "Teo" : 2,
    "Trevor" : 3
}

@app.get("/health")
def health():
    return test

@app.post("/health")
def edithealth(input1: str, input2: int):
    global test
    if(input1 in test and input2 == test[input1]):
        return "VALID"
    else:
        return "NAH"
def encryption(input2: int):
    global test
    input2 += 3
    return input2


@app.post("/makeaccount")
def makeNewAccount(username: str, password: int):
    global test
    if(username in test):
        return "Account name taken please try diffrent name"
    else:
        test[username] = encryption(password)
        return "Account made Suceesfully"

