#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
AI 导航站资源批量添加工具
使用方法：python add_resources.py
"""

import json
from datetime import datetime
import os

# 资源模板
RESOURCE_TEMPLATE = """
                <div class="resource-card">
                    <div class="resource-icon" style="background: {bg_color};">{icon}</div>
                    <div class="resource-content">
                        <h3 class="resource-title">{name}</h3>
                        <p class="resource-desc">{description}</p>
                        <div class="resource-tags">
                            {tags_html}
                        </div>
                        <a href="{url}" target="_blank" class="resource-link">访问官网 →</a>
                    </div>
                </div>
"""

TAG_TEMPLATE = '<span class="tag">{tag}</span>'

# 背景颜色循环
BG_COLORS = ['#FFE5E5', '#E5F4FF', '#FFF4E5', '#E5FFE5', '#F0F0FF', '#FFE5F0']

def add_resource_to_markdown(name, url, category, tags, description, icon='🔗'):
    """添加资源到 RESOURCES.md"""
    date = datetime.now().strftime('%Y-%m-%d')
    tags_str = '/'.join(tags)
    
    md_line = f"| {name} | {url} | {tags_str} | ✅ 已收录 | {date} |\n"
    
    print(f"✅ 已添加到 RESOURCES.md: {name}")
    return md_line

def add_resource_to_html(name, url, tags, description, icon='🔗', category='ai-tools'):
    """生成 HTML 卡片代码"""
    bg_color = BG_COLORS[len(tags) % len(BG_COLORS)]
    tags_html = ''.join([TAG_TEMPLATE.format(tag=tag) for tag in tags])
    
    html = RESOURCE_TEMPLATE.format(
        bg_color=bg_color,
        icon=icon,
        name=name,
        description=description,
        tags_html=tags_html,
        url=url
    )
    
    print(f"✅ 已生成 HTML 代码：{name}")
    return html

def main():
    """主函数"""
    print("=" * 50)
    print("AI 导航站资源批量添加工具")
    print("=" * 50)
    print()
    
    # 示例资源
    resources = [
        {
            'name': 'Claude',
            'url': 'https://claude.ai',
            'category': 'AI 工具',
            'tags': ['对话', '写作', '编程'],
            'description': 'Anthropic 最强 AI 助手，对话自然，逻辑清晰',
            'icon': '🤖'
        },
        {
            'name': 'Gemini',
            'url': 'https://gemini.google.com',
            'category': 'AI 工具',
            'tags': ['对话', '多模态', 'Google'],
            'description': 'Google 最强 AI 模型，支持文本、图片、代码',
            'icon': '✨'
        },
        {
            'name': 'Suno',
            'url': 'https://suno.ai',
            'category': 'AI 工具',
            'tags': ['音乐', '生成', '创意'],
            'description': 'AI 音乐生成神器，输入文字即可创作歌曲',
            'icon': '🎵'
        }
    ]
    
    print(f"准备添加 {len(resources)} 个资源...\n")
    
    # 添加到 Markdown
    print("📝 更新 RESOURCES.md...")
    with open('add_to_markdown.txt', 'w', encoding='utf-8') as f:
        for res in resources:
            line = add_resource_to_markdown(
                res['name'],
                res['url'],
                res['category'],
                res['tags'],
                res['description'],
                res['icon']
            )
            f.write(line)
    
    print()
    
    # 生成 HTML
    print("💻 生成 HTML 代码...")
    with open('add_to_html.txt', 'w', encoding='utf-8') as f:
        for res in resources:
            html = add_resource_to_html(
                res['name'],
                res['url'],
                res['tags'],
                res['description'],
                res['icon'],
                res['category'].lower()
            )
            f.write(html)
            f.write("\n")
    
    print()
    print("=" * 50)
    print("✅ 完成！请查看生成的文件：")
    print("   - add_to_markdown.txt（添加到 RESOURCES.md）")
    print("   - add_to_html.txt（添加到 index.html）")
    print("=" * 50)
    print()
    print("📋 下一步操作：")
    print("1. 复制 add_to_markdown.txt 内容到 RESOURCES.md")
    print("2. 复制 add_to_html.txt 内容到 index.html 对应分类下")
    print("3. 运行：git add . && git commit -m '添加新资源' && git push")
    print()

if __name__ == '__main__':
    main()
