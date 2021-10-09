import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import RegionContext from './context';
import FLAGS from './flags';
import LABELS from './regionLabels';
import SLUGS from './regionSlugs';

const Switcher = styled.span`
    display: inline-block;
    position: relative;
`;

const SwitcherButton = styled.button`
    ${({ theme }) => theme.typography.variants.body2};
    border: 0;
    background: transparent;
    cursor: pointer;
    border-bottom: 1px dashed currentColor;
`;

const SwitcherNav = styled.nav`
    position: absolute;
    z-index: 10;
    overflow: hidden;
    transform: scale(0);
    transform-origin: top center;
    transition: transform 300ms ease-in;
`;

const SwitcherList = styled.ul`
    list-style: none;
    border: 1px solid ${({ theme }) => theme.palette.line};
`;

const SwitcherListItem = styled.li`
    text-align: left;
    background-color: ${({ theme }) => theme.palette.background.secondary};
`;

const SwitcherLink = styled(Link)`
    text-decoration: none;
    display: block;
    color: inherit;
    padding: ${({ theme }) => theme.spacing(1)};
    white-space: nowrap;

    &:hover,&:focus {
        background-color: ${({ theme }) => theme.palette.background.focus};
    }
`;

const SwitcherFlag = styled.img`
    vertical-align: middle;
    margin-right: ${({ theme }) => theme.spacing(1)};
`;

export default function RegionSwitcher({ id = 'region-switcher', year }) {
    const [isOpen, setIsOpen] = useState(false);
    const { region } = useContext(RegionContext);
    const navRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (!navRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navRef, buttonRef]);

    const onButtonClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const idButton = `${id}-button`;
    const idMenu = `${id}-menu`;

    return (
        <Switcher>
            <SwitcherButton
                onClick={onButtonClick}
                ref={buttonRef}
                id={idButton}
                aria-controls={idMenu}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : 'false'}
            >
                <SwitcherFlag
                    src={FLAGS[region]}
                    alt=""
                />
                { LABELS[region] }
            </SwitcherButton>
            <SwitcherNav
                style={{ transform: `scale(${isOpen ? 1 : 0 })` }}
                ref={navRef}
                id={idMenu}
                aria-labelledby={idButton}
            >
                <SwitcherList role="menu">
                   { ['eur', 'usa', 'jap', 'all']
                    .filter((navRegion) => navRegion !== region)
                    .map((navRegion) => (
                            <SwitcherListItem key={navRegion}>
                                <SwitcherLink to={`/jeux-de-${year}${SLUGS[navRegion]}`}>
                                    <SwitcherFlag
                                        src={FLAGS[navRegion]}
                                        alt=""
                                    />
                                    { LABELS[navRegion] }
                                </SwitcherLink>
                            </SwitcherListItem>
                   )) }
                </SwitcherList>
            </SwitcherNav>
        </Switcher>
    );
}
