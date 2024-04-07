---
title: "Using Vim with non-latin input"
description: "Use fcitx5 and rlue/vim-barbaric to automatically switch input methods back and forth as you enter and exit normal mode."
image: "/assets/images/vim-input.webp"
---

Many native English-speaking people will fail to relate to this problem,
but whenever I had to write something in a completely different language
that doesn't use Latin characters, I was forced to use a different text editor.
Why? Because vim only recognizes Latin characters for command input.
Since most of vim's benefits come from commands,
this rendered it unusable for me when it came to writing in my native language -- Georgian.
I had to manually switch input method every time I went in and out of insert/normal mode.
Recently I came across a simple solution which I am going to present here in hopes
that other people will have to do less digging.

The following method will work on Linux and MacOS.
I am assuming that if you are using vim that much, you are not using Windows.
I am also assuming that you know how to use and configure vim with plugins.
You can skip the fcitx5 part if you use mac.

> **TL;DR:** Use [fcitx5](https://wiki.archlinux.org/title/Fcitx5)
> and [rlue/vim-barbaric](https://github.com/rlue/vim-barbaric)
> to automatically switch input methods back and forth as you enter and exit normal mode.

## Fcitx5

[Fcitx5](https://wiki.archlinux.org/title/Fcitx5) is an extensible input method framework.
It basically allows you to manage input methods (languages that you write with your keyboard).
Note that it changes how you work with input methods.
Every window will now have a separate input mode
which means that if you changed input method in one window, the same will not happen for the other.

Let's set it up.

On ArchLinux:

```sh
sudo pacman -S fcitx5 fcitx5-configtool
```

On Debian-based distro:

```sh
sudo apt install fcitx5 fcitx5-configtool
```

We need the program and its configuration tool.

Now we need to set the environment variables.
Append the following lines to `/etc/environment`:

```
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
GLFW_IM_MODULE=ibus
```

The program has to autostart. This can be done several ways.
I use i3 so in my case I just need to add this line to the i3 configuration file:

```
exec fcitx5
```

Then simply configure fcitx5 with `fcitx5-configtool`.
This framework has groups and input methods.
Each group can have as many input methods as you like.
I personally have `Group 1` with just English input
and `Group 2` with both Georgian and English.
I switch to the latter when I am using vim to write text in Georgian.

## Vim-Barbaric

I came across [vim-barbaric](https://github.com/rlue/vim-barbaric)
which is a very simple and intuitive plugin.
It switches input methods when you exit and enter normal mode.
It is also compatible with many other systems like fcitx5.
There are several alternatives but this one has the coolest name.

Install it with whichever plugin manager you use.
For brevity I will just show an example with [packer](https://github.com/wbthomason/packer.nvim):

```lua
use {
  "rlue/vim-barbaric",
}
```

The plugin works out of the box, so we don't really need to configure it further.
After we install the plugin, switching the input method should be done automatically.
The current input method is assumed to be the one we want to use in the normal mode.

A small caveat in case of Linux is that this plugin might work even when we don't want it to.
This is the reason why I have a separate group configured in `fcitx5-configtool`
which only contains English.
Alternatively, one could also write `vim-barbaric` toggle command but that's enough to give you an idea.
I noticed that if you switch the input method in insert mode with something else that you didn't start
with in normal mode, it acts as a cue for vim-barbaric to start working.
If you switch to the input method in insert mode which was also the one you started with in normal mode,
then vim-barbaric stops.

Now you can flex vim usage in every language you want.

სხვათაშორის, ვიმს ვიყენებ.

![demonstrating the final result](https://i.imgur.com/nfZ9riD.gif)
