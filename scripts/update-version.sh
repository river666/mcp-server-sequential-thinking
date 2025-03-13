#!/bin/bash

# 检查参数
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <patch|minor|major>"
    exit 1
fi

# 检查参数是否有效
if [[ ! "$1" =~ ^(patch|minor|major)$ ]]; then
    echo "Error: Version type must be 'patch', 'minor', or 'major'"
    exit 1
fi

# 获取当前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# 更新版本号
npm version $1

# 获取新版本
NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version: $NEW_VERSION"

# 构建项目
npm run build

# 确认是否发布
read -p "Do you want to publish this version to npm? (y/n) " PUBLISH
if [[ $PUBLISH == "y" || $PUBLISH == "Y" ]]; then
    # 发布到 npm
    npm publish --access public
    echo "Published to npm registry"
    
    # 创建标签并推送
    git tag "v$NEW_VERSION" -m "Release v$NEW_VERSION"
    git push && git push --tags
    echo "Pushed tags to repository"
    
    # 确认是否构建 Docker 镜像
    read -p "Do you want to build and push Docker image? (y/n) " DOCKER
    if [[ $DOCKER == "y" || $DOCKER == "Y" ]]; then
        # 构建并推送 Docker 镜像
        docker build -t "dreamboatcmcp/sequential-thinking:$NEW_VERSION" -t "dreamboatcmcp/sequential-thinking:latest" .
        docker push "dreamboatcmcp/sequential-thinking:$NEW_VERSION"
        docker push "dreamboatcmcp/sequential-thinking:latest"
        echo "Docker image pushed"
    fi
else
    echo "Version updated but not published"
fi

echo "Done!" 