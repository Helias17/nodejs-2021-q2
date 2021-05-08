1. Clone repository to your PC
2. Switch to branch "caesar-cipher"
3. Go to folder "caesar-cipher"
3. npm install
4. Application is written on typescript. To run it, you should use next syntax:
```
ts-node src/app.ts -i input.txt -o output.txt -s 3 -a encode
```

```
##Options:
  -s, --shift <shift>    shift
  -i, --input <input>    input file
  -o, --output <output>  output file
  -a, --action <action>  action (choices: "encode", "decode")
  -h, --help             display help for command
```