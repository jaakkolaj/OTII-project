import React from 'react';
import { Mail, Phone, MapPin} from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            About
                        </h3>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Building amazing applications with modern technology.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Contact
                        </h3>
                        <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:info@example.com">info@example.com</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+358 123 456 789</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>Finland</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        © {currentYear} Your Company. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;