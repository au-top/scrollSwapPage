npx babel ./src --presets=@babel/preset-typescript,@babel/preset-env  --plugins=@babel/plugin-transform-runtime,@babel/plugin-proposal-class-properties     --copy-files --extensions ".ts" --out-dir babel_dist 
npx webpack --entry=./babel_dist --output-path=./build --target=web
cp ./src/index.html ./build