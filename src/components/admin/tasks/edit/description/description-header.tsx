import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Task } from '@/types'
import { useTranslation } from 'react-i18next'

type Props = {
    description?: Task['description']
    onAdd?: () => void
    onEdit?: () => void
}

export const DescriptionHeader: React.FC<Props> = ({
    description,
    onAdd,
    onEdit,
}) => {
    const { t } = useTranslation()
    if (description) {
        return (
            <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => (
                            <h1 className="text-2xl font-bold" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                            <h2 className="text-xl font-semibold" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc ml-5" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal ml-5" {...props} />
                        ),
                        table: ({ node, ...props }) => (
                            <table
                                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                                {...props}
                            />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => (
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                {...props}
                            />
                        ),
                        a: ({ node, ...props }) => (
                            <a
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                {...props}
                            />
                        ),
                    }}
                >
                    {description}
                </ReactMarkdown>
                <div className="mt-2">
                    <Button variant="outline" size="sm" onClick={onEdit}>
                        {t('edit_description')}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Button variant="link" onClick={onAdd}>
            {t('add_description')}
        </Button>
    )
}
