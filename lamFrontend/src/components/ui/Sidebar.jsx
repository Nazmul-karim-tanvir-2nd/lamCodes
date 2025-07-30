import React, { useEffect, useState, useCallback, useMemo, useContext, createContext } from "react";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile.jsx";
import { cn } from "../../lib/utils";
import { Button } from "./Button";
import SidebarContent from "./SidebarContent";  // Sidebar content component

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = createContext(null);

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
    return context;
}

function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);
    const [_open, _setOpen] = useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = useCallback(
        (value) => {
            const openState = typeof value === "function" ? value(open) : value;
            setOpenProp ? setOpenProp(openState) : _setOpen(openState);
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setOpenProp, open]
    );

    const toggleSidebar = useCallback(() => {
        return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
    }, [isMobile, setOpen, setOpenMobile]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = useMemo(() => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
    }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                data-slot="sidebar-wrapper"
                style={{
                    "--sidebar-width": SIDEBAR_WIDTH,
                    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                    ...style,
                }}
                className={cn(
                    "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-screen w-full",
                    className
                )}
                {...props}
            >
                <SidebarContent />
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

function SidebarTrigger({ className, onClick, ...props }) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={cn("size-7", className)}
            onClick={(event) => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
        >
            <PanelLeftIcon />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}

export {
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
};